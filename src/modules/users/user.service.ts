import { Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/config/exceptions/exceptions.service";
import { IDatabaseAbstract } from "src/frameworks/pg/core/abstract/database.abstract";
import { Roles } from "src/lib/enum/roles/roles.enum";
import { IUserCreate } from "./core/interfaces/create-user.interface";
import { HashPassword } from "./functions/hashed/password";

@Injectable()
export class UserService {
    constructor(
        private databaseService: IDatabaseAbstract, 
        private exceptions: ExceptionsService,
    ) {};

    async allUsers(userId:string){
        await this.verifyRoleOfUser(userId);
        const users = await this.databaseService.users.findAll();
        if(!users.length || users.length < 0) this.exceptions.notFoundException({
            message: 'users doest not found'
        });

        return users;
    };
    async myUser(userId:string){
        const user = await this.databaseService.users.findOne(userId);
        if(!user) this.exceptions.notFoundException({
            message: 'user doest not found'
        });

        return user;
    };
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
    private async verifyRoleOfUser(userId){
        const user = await this.databaseService.users.findOne(userId);
        if(user.role !== Roles.ADMIN) this.exceptions.UnauthorizedException({
            message: 'unauthorized user'
        })
    };
};