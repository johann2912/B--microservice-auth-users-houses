import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Document } from "src/lib/enum/document/documents.enum";
import { IUser } from "../../interfaces/user.interface";

export class UserUpdateEntryDto implements IUser {
    @ApiProperty({nullable: true, required: false})
    @IsString()
    @IsOptional()
    name: string;
    @ApiProperty({nullable: true, required: false})
    @IsString()
    @IsOptional()
    lastname: string;
    @ApiProperty({type: 'enum', enum: Document, nullable: true, required: false})
    @IsOptional()
    documentType: Document;
    @ApiProperty({nullable: true, required: false})
    @IsString()
    @IsOptional()
    documentNumber: string;
    @ApiProperty({nullable: true, required: false})
    @IsEmail()
    @IsOptional()
    email: string;
    @ApiProperty({type: String, nullable: true, required: false})
    @IsOptional()
    phone: string;
    @ApiProperty({nullable: true, required: false})
    @IsString()
    @IsOptional()
    age:string;
};