import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreateReservationDtoResponse {
    @Expose()
    id: string;
    @Expose()
    createAt: Date;
    @ApiProperty()
    @Expose()
    dateStart: Date;
    @ApiProperty()
    @Expose()
    dateEnd: Date;
    @ApiProperty()
    @Expose()
    discountCode:string
    @ApiProperty()
    @Expose()
    user: string;
    @ApiProperty()
    @Expose()
    house: string;
}