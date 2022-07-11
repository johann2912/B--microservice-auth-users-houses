import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { StatusHouse } from "src/lib/enum/status-house/status-home.enum";
import { IHouse } from "../../interfaces/house.interface";

export class HouseCreateDtoResponse implements IHouse {
    @Expose()
    id?: string;
    @Expose()
    createAt?: Date;
    @ApiProperty()
    @Expose()
    countryAndCity?: string;
    @ApiProperty()
    @Expose()
    address?: string;
    @ApiProperty()
    @Expose()
    area?: string;
    @ApiProperty()
    @Expose()
    statusHouse?: StatusHouse;
};