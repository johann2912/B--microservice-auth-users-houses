import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Session, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { AccessGuard } from "src/lib/guards/access.guard";
import { IAccess } from "src/lib/jwt/interfaces/access";
import { HouseCreateDtoEntry } from "./core/dto/entry/create-house.dto";
import { HouseCreateDtoResponse } from "./core/dto/response/create-house.response";
import { HouseDeleteDtoResponse } from "./core/dto/response/delete-house.response";
import { HouseService } from "./house.service";


@ApiTags('House')
@Controller('House')
export class HouseController {
    constructor(private readonly houseService: HouseService){};

    @Get('all')
    @ApiOperation({ summary: `houses to be listed by users, 
    can only be created with an ADMIN user role` })
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: [HouseCreateDtoResponse] })
    async allHouses(
        @Session() payload: IAccess
    ){
        const houses = await this.houseService.all(payload.id);
        return plainToClass(HouseCreateDtoResponse, houses, {excludeExtraneousValues:true});
    };

    @Get('by-id/:houseId')
    @ApiOperation({ summary: `houses to be listed by users, 
    can only be created with an ADMIN user role` })
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: HouseCreateDtoResponse })
    async searchHouse(
        @Session() payload: IAccess,
        @Param('houseId', ParseUUIDPipe) houseId:string
    ){
        const house = await this.houseService.searchHouse(payload.id, houseId);
        return plainToClass(HouseCreateDtoResponse, house, {excludeExtraneousValues:true});
    };

    @Post('create')
    @ApiOperation({ summary: `houses to be reserved by users, 
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

    @Delete('delete/:houseId')
    @ApiOperation({ summary: `houses can only be deleted by an ADMIN role user` })
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: HouseDeleteDtoResponse })
    async deleteHouse(
        @Param('houseId', ParseUUIDPipe) houseId: string,
        @Session() payload: IAccess,
    ){
        const house = await this.houseService.deleteHouse(payload.id, houseId);
        return plainToClass(HouseDeleteDtoResponse, house, {excludeExtraneousValues:true});
    };
};