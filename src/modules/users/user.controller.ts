import { Body, Controller, Get, Patch, Post, Put, Session, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { AccessGuard } from "src/lib/guards/access.guard";
import { IAccess } from "src/lib/jwt/interfaces/access";
import { UserCreateEntryDto } from "./core/dto/entry/create-user-entry.dto";
import { UserUpdateEntryDto } from "./core/dto/entry/update-user-entry.dto";
import { UserPasswordUpdateEntryDto } from "./core/dto/entry/update-user-password.dto";
import { UserCreateReponseDto } from "./core/dto/reponse/create-user-response.dto";
import { UserUpdateReponseDto } from "./core/dto/reponse/update-user-response.dto";
import { UserService } from "./user.service";

@ApiTags('Users')
@Controller('Users')
export class UsersController {
    constructor(private readonly userService: UserService){};

    @Get('all')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: [UserCreateReponseDto]})
    async allUsers(@Session() payload: IAccess){
        const users = await this.userService.allUsers(payload.id);
        return plainToClass(UserCreateReponseDto, users, {excludeExtraneousValues:true});
    };

    @Get('my-user')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: UserCreateReponseDto})
    async myUser(@Session() payload: IAccess){
        const users = await this.userService.myUser(payload.id);
        return plainToClass(UserCreateReponseDto, users, {excludeExtraneousValues:true});
    };

    @Post('create')
    @ApiOkResponse({type: UserCreateReponseDto})
    async createUser(
        @Body() userData: UserCreateEntryDto
    ){
        const user = await this.userService.createUser(userData);
        return plainToClass(UserCreateReponseDto, user, {excludeExtraneousValues:true});
    };

    @Put('update')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: UserUpdateReponseDto})
    async updateUser(
        @Session() payload: IAccess,
        @Body() userData: UserUpdateEntryDto
    ){
        const user = await this.userService.updateUser(payload.id, userData);
        return plainToClass(UserUpdateReponseDto, user, {excludeExtraneousValues:true});
    };

    @Patch('update-password')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: UserUpdateReponseDto})
    async updatePasswordUser(
        @Session() payload: IAccess,
        @Body() userData: UserPasswordUpdateEntryDto
    ){
        const user = await this.userService.updatePasswordUser(payload.id, userData);
        return plainToClass(UserUpdateReponseDto, user, {excludeExtraneousValues:true});
    };
};