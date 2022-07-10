import { Body, Controller, Get, Post, Session, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { AccessGuard } from "src/lib/guards/access.guard";
import { IAccess } from "src/lib/jwt/interfaces/access";
import { UserCreateEntryDto } from "./core/dto/entry/create-user-entry.dto";
import { UserCreateReponseDto } from "./core/dto/reponse/create-user-response.dto";
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
    }

    @Post('create')
    @ApiOkResponse({type: UserCreateReponseDto})
    async createUser(
        @Body() userData: UserCreateEntryDto
    ){
        const user = await this.userService.createUser(userData);
        return plainToClass(UserCreateReponseDto, user, {excludeExtraneousValues:true});
    }
};