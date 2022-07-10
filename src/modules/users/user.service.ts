import { Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/config/exceptions/exceptions.service";
import { IDatabaseAbstract } from "src/frameworks/pg/core/abstract/database.abstract";
import { IUserCreate } from "./core/interfaces/create-user.interface";
import { HashPassword } from "./functions/hashed/password";

@Injectable()
export class UserService {
    constructor(
        private databaseService: IDatabaseAbstract, 
        private exceptions: ExceptionsService,
    ) {};

    async createUser({password, ...userData}:IUserCreate){
        await this.verifyExistenceOfUser(userData.email);
        const userInstance = {
            password: HashPassword.encryptPassword(password),
            ...userData,
        };
        const user = await this.databaseService.users.create(userInstance);
        return user;
    };

    private async verifyExistenceOfUser(email){
        const user = await this.databaseService.users.findByEmail(email);
        if(user) this.exceptions.badRequestException({
            message: 'user already exists'
        });
    };
};