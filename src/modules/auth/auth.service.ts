import { Delete, Injectable, Session, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ExceptionsService } from "src/config/exceptions/exceptions.service";
import { IDatabaseAbstract } from "src/frameworks/pg/core/abstract/database.abstract";
import { RedisService } from "src/frameworks/redis/redis.service";
import { JWTService } from "src/lib/jwt/jwt.service";
import { HashPassword } from "../users/functions/hashed/password";
import { Ilogin } from "./core/interfaces/login.interface";

@Injectable()
export class AuthService {
    constructor(
        private databaseService: IDatabaseAbstract, 
        private exceptions: ExceptionsService,
        private jwtService: JWTService,
        private redisService: RedisService,
    ) {};

    async login({email, password}:Ilogin){
        const user = await this.databaseService.users.findByEmail(email);
        if (user && HashPassword.verifyPassword(password, user.password)) {
            return {
              access: await this.jwtService.createAccess({ id: user.id }),
              refresh: await this.jwtService.createRefresh({ id: user.id }),
            };
        };
        this.exceptions.UnauthorizedException({message: 'Invalid credential'});
    };
    async refresh(id:string){
        await this.redisService.deleteSessionValue(id);
        return {
            access: await this.jwtService.createAccess({ id }),
            refresh: await this.jwtService.createRefresh({ id }),
        };
    };
    public async logout(id: string) {
        await this.redisService.deleteSessionValue(id);
    };

};