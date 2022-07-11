import { Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/config/exceptions/exceptions.service";
import { IDatabaseAbstract } from "src/frameworks/pg/core/abstract/database.abstract";
import { Roles } from "src/lib/enum/roles/roles.enum";
import { IReservationCreate } from "./core/interfaces/create-reservation.interface";
import { FindDiscountCode } from "./functions/discount-validate/discount-code";

@Injectable()
export class ReservationService {
    constructor(
        private databaseService: IDatabaseAbstract, 
        private exceptions: ExceptionsService,
    ) {};

    async allReservations(userId:string){
        const user = await this.verifyExistUser(userId);
        if(user.role === Roles.ADMIN) this.exceptions.badRequestException({
            message: 'the user does not have permission'
        });
        const reservation = await this.databaseService.reservations.findAll();
        if(!reservation.length || reservation.length < 0) this.exceptions.notFoundException({
            message: 'reservations does not found'
        });

        return reservation;
    }

    async createReservation(userId:string, houseId:string,{house, user, ...reservationData}: IReservationCreate){
        await this.verifyValidateCodeDiscount(reservationData.discountCode);
        const userInstance = await this.verifyExistUser(userId);
        const houseInstance = await this.verifyExistHouse(houseId);
        const reservationInstance = {
            ...reservationData,
            user: userInstance,
            house: houseInstance
        };
        const {user:userDB, house:houseDB, ...reservation} = 
            await this.databaseService.reservations.create(reservationInstance);
        const response = {
            ...reservation,
            user: userDB.id,
            house: houseDB.id
        };
        return response
    };

    async deleteReservation(userId, reservationId:string){
        const reservation:any = await this.databaseService.reservations.findOneAllInformation(reservationId);
        const user = await this.verifyExistUser(userId);
        if(!reservation || user.id !== reservation.user_id) this.exceptions.notFoundException({
            message: 'reservation does not found'
        });
        await this.databaseService.reservations.delete(reservation.id);

        return { message: 'reservation successfully deleted'};
    }

    private async verifyExistHouse(houseId){
        const house = await this.databaseService.houses.findOne(houseId);
        if(!house) this.exceptions.notFoundException({
            message: 'house does not found'
        });

        return house
    };

    private async verifyExistUser(userId){
        const user = await this.databaseService.users.findOne(userId);
        if(!user) this.exceptions.notFoundException({
            message: 'user does not found'
        });

        return user;
    };

    private async verifyValidateCodeDiscount(code:string){
        const discountCode = await FindDiscountCode.getCodeAndValidate(code);

        if(discountCode.expired !== false) this.exceptions.badRequestException({
            message: 'discount code invalid'});
        
    };
};
