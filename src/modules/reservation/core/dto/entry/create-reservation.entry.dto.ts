import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IReservation } from "../../interfaces/reservation.interface";

export class CreateReservationDtoEntry implements IReservation {
    @ApiProperty({type: Date, example: '2022-07-15'})
    @IsNotEmpty()
    dateStart?: Date;
    @ApiProperty({type: Date, example: '2022-07-15'})
    @IsNotEmpty()
    dateEnd?: Date;
    @ApiProperty()
    @IsNotEmpty()
    discountCode?:string
    userId?: string;
    houseId?: string;
}