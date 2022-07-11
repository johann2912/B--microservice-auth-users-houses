import { Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/config/exceptions/exceptions.service";
import { IDatabaseAbstract } from "src/frameworks/pg/core/abstract/database.abstract";
import { Roles } from "src/lib/enum/roles/roles.enum";
import { IUserCreate } from "./core/interfaces/create-user.interface";
import { IUserPasswordUpdate } from "./core/interfaces/update-user-password.interface";
import { IUserUpdate } from "./core/interfaces/update-user.interface";
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

    async updateUser(userId:string, {password, ...userData}: IUserUpdate){
        const user = await this.myUser(userId);
        await this.databaseService.users.update(user.id, userData);

        return { message: 'user updated succesfully'};
    }

    async updatePasswordUser(userId, {password, newPassword}:IUserPasswordUpdate){
        const user = await this.myUser(userId);
        await this.verifyPasswordAndUpdatePassword(user.id, password, newPassword, user.password);
    };

    async deleteUser(userAdminId, userDeletedId){
        await this.verifyRoleOfUser(userAdminId);
        const user = await this.databaseService.users.findOne(userAdminId);
        if(!user) this.exceptions.notFoundException({
            message: 'user doest not found'
        });
        await this.databaseService.users.delete(user.id);

        return { message: 'user successfully deleted'};
    }

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
    private async verifyPasswordAndUpdatePassword(userId, password, userNewPassword, userPasswordDB){
        if(HashPassword.verifyPassword(password, userPasswordDB) === true){
            const hashedPassword = HashPassword.encryptPassword(userNewPassword);
            await this.databaseService.users.update(userId, {
                password: hashedPassword
            });
        } else {
            return this.exceptions.badRequestException({
                message: 'invalid password'
            })
        };
    };
};