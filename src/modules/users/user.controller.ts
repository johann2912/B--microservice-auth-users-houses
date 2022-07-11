import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Session, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
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
    @ApiOperation({ summary: `view a list of all users, can only 
    be used with users who have the ADMIN role.` })
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: [UserCreateReponseDto]})
    async allUsers(@Session() payload: IAccess){
        const users = await this.userService.allUsers(payload.id);
        return plainToClass(UserCreateReponseDto, users, {excludeExtraneousValues:true});
    };

    @Get('my-user')
    @ApiOperation({ summary: 'view all my user information' })
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: UserCreateReponseDto})
    async myUser(@Session() payload: IAccess){
        const users = await this.userService.myUser(payload.id);
        return plainToClass(UserCreateReponseDto, users, {excludeExtraneousValues:true});
    };

    @Post('create')
    @ApiOperation({ summary: `create a user, a person will be able to create his own 
    user for the moment anyone can do it, in the future the restrictions may be modified.`})
    @ApiOkResponse({type: UserCreateReponseDto})
    async createUser(
        @Body() userData: UserCreateEntryDto
    ){
        const user = await this.userService.createUser(userData);
        return plainToClass(UserCreateReponseDto, user, {excludeExtraneousValues:true});
    };

    @Put('update')
    @ApiOperation({ summary: 'I can only modify my own user.' })
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

    @Patch('change-password')
    @ApiOperation({ summary: `Password change is managed separately, as validations by mail 
    or SMS may be added in the future to enforce the user's identity.`})
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

    @Delete('delete/:userId')
    @ApiOperation({ summary: `a user can only be deleted by a user in the ADMIN role.`})
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: UserUpdateReponseDto})
    async deleteUser(
        @Session() payload: IAccess,
        @Param('userId', ParseUUIDPipe) userId: string
    ){
        const user = await this.userService.deleteUser(payload.id, userId);
        return plainToClass(UserUpdateReponseDto, user, {excludeExtraneousValues:true});
    };
};