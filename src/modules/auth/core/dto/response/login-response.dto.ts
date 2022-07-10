import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthOutput {
    @ApiProperty()
    @Expose()
    access: string;
    @ApiProperty()
    @Expose()
    refresh: string;
};