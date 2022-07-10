import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { UserCreateEntryDto } from "./core/dto/entry/create-user-entry.dto";
import { UserCreateReponseDto } from "./core/dto/reponse/create-user-response.dto";
import { UserService } from "./user.service";

@ApiTags('Users')
@Controller('Users')
export class UsersController {
    constructor(private readonly userService: UserService){};

    @Post('create')
    @ApiOkResponse({type: UserCreateReponseDto})
    async createUser(
        @Body() userData: UserCreateEntryDto
    ){
        const user = await this.userService.createUser(userData);
        return plainToClass(UserCreateReponseDto, user, {excludeExtraneousValues:true});
    }
};