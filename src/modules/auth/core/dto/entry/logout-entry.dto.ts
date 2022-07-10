import { ApiProperty } from "@nestjs/swagger";

export class LogoutOutputDto {
    @ApiProperty()
    message: string;
};