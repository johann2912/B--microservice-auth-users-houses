import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { StatusHouse } from "src/lib/enum/status-house/status-home.enum";
import { IHouse } from "../../interfaces/house.interface";

export class HouseCreateDtoEntry implements IHouse {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    countryAndCity?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    area?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    statusHouse?: StatusHouse;
};