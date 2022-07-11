import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserUpdateReponseDto {
    @ApiProperty()
    @Expose()
    message: string;
};