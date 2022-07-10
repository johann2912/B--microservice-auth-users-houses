import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IUser } from "../../interfaces/user.interface";

export class UserPasswordUpdateEntryDto implements IUser {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password?: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    newPassword?: string;
};