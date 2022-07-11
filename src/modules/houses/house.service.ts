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

    async createHouse(userId, houseData: ICreateHouse){
        await this.verifyRoleUser(userId);
        const house = await this.databaseService.houses.create(houseData);
        return house;
    }

    private async verifyRoleUser(userId){
        const user = await this.databaseService.users.findOne(userId);
        if(user.role !== Roles.ADMIN) this.exceptions.badRequestException({
            message: 'the user does not have permissions'
        });
    }
};