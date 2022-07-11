import { Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/config/exceptions/exceptions.service";
import { IDatabaseAbstract } from "src/frameworks/pg/core/abstract/database.abstract";
import { Roles } from "src/lib/enum/roles/roles.enum";
import { ICreateHouse } from "./core/interfaces/create-house.interface";

@Injectable()
export class HouseService {
    constructor(
        private databaseService: IDatabaseAbstract, 
        private exceptions: ExceptionsService,
    ) {};

    async all(userId){
        await this.verifyRoleUser(userId);
        const houses = await this.databaseService.houses.findAll();
        if(!houses.length || houses.length < 0) this.exceptions.notFoundException({
            message: 'houses does not found'
        });

        return houses;
    };

    async searchHouse(userId, houseId){
        await this.verifyRoleUser(userId);
        const house = await this.searchHouseById(houseId);

        return house;
    }

    async createHouse(userId, houseData: ICreateHouse){
        await this.verifyRoleUser(userId);
        const house = await this.databaseService.houses.create(houseData);
        return house;
    };

    async deleteHouse(userId, houseId){
        await this.verifyRoleUser(userId);
        const house = await this.searchHouseById(houseId);
        await this.databaseService.houses.delete(house.id);
        
        return  { message: 'house successfully deleted' };
    };

    private async verifyRoleUser(userId){
        const user = await this.databaseService.users.findOne(userId);
        if(user.role !== Roles.ADMIN) this.exceptions.badRequestException({
            message: 'the user does not have permissions'
        });
    };

    private async searchHouseById(houseId){
        const house = await this.databaseService.houses.findOne(houseId);
        if(!house) this.exceptions.notFoundException({
            message: 'house does not found'
        });

        return house;
    }
};