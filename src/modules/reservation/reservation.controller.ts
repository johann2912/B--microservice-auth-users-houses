import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Session, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { AccessGuard } from "src/lib/guards/access.guard";
import { IAccess } from "src/lib/jwt/interfaces/access";
import { CreateReservationDtoEntry } from "./core/dto/entry/create-reservation.entry.dto";
import { CreateReservationDtoResponse } from "./core/dto/response/create-reservation.response.dto";
import { DeleteReservationDtoResponse } from "./core/dto/response/delete-reservation.response.dto";
import { ReservationService } from "./reservation.service";

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService){};

    @Get('all')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: [CreateReservationDtoResponse]})
    async allReservations(
        @Session() payload: IAccess,
    ){
        const reservation = await this.reservationService.allReservations(payload.id);
        return plainToClass(CreateReservationDtoResponse, reservation, {excludeExtraneousValues:true});
    };

    @Post('create/:houseId')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: CreateReservationDtoResponse})
    async createReservation(
        @Session() payload: IAccess,
        @Param('houseId', ParseUUIDPipe) houseId: string,
        @Body() reservationData: CreateReservationDtoEntry
    ){
        const reservation = await this.reservationService.createReservation(payload.id, houseId, reservationData);
        return plainToClass(CreateReservationDtoResponse, reservation, {excludeExtraneousValues:true});
    };

    @Delete('delete/:reservationId')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: DeleteReservationDtoResponse})
    async deleteReservation(
        @Session() payload: IAccess,
        @Param('reservationId', ParseUUIDPipe) reservationId: string,
    ){
        const reservation = await this.reservationService.deleteReservation(payload.id, reservationId);
        return plainToClass(DeleteReservationDtoResponse, reservation, {excludeExtraneousValues:true});
    };

};