import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserUpdateReponseDto {
    @ApiProperty()
    @Expose()
    path: string;
    @ApiProperty()
    @Expose()
    duration: string;
    @ApiProperty()
    @Expose()
    method: string;
    @ApiProperty({example: 200})
    @Expose()
    code: number;
};