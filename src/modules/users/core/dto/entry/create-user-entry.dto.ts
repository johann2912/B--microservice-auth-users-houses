import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Document } from "src/lib/enum/document/documents.enum";
import { Roles } from "src/lib/enum/roles/roles.enum";
import { IUser } from "../../interfaces/user.interface";

export class UserCreateEntryDto implements IUser {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname: string;
    @ApiProperty({type: 'enum', enum: Document})
    @IsNotEmpty()
    documentType: Document;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    documentNumber: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
    @ApiProperty({type: String, nullable: true, required: false})
    @IsOptional()
    phone: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    age:string;
    @ApiProperty({type: 'enum', enum: Roles})
    @IsNotEmpty()
    role: Roles;
};