import { Body, Controller, Post, Session, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { AccessGuard } from "src/lib/guards/access.guard";
import { IAccess } from "src/lib/jwt/interfaces/access";
import { HouseCreateDtoEntry } from "./core/dto/entry/create-house.dto";
import { HouseCreateDtoResponse } from "./core/dto/response/create-house.response";
import { HouseService } from "./house.service";


@ApiTags('House')
@Controller('House')
export class HouseController {
    constructor(private readonly houseService: HouseService){};

    @Post('create')
    @ApiOperation({ summary: `houses to be reserved by clients, 
    can only be created with an ADMIN user role` })
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: HouseCreateDtoResponse })
    async createHouse(
        @Session() payload: IAccess,
        @Body() houseData: HouseCreateDtoEntry
    ){
        const house = await this.houseService.createHouse(payload.id, houseData);
        return plainToClass(HouseCreateDtoResponse, house, {excludeExtraneousValues:true});
    };

}