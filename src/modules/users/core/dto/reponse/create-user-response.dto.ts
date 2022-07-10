import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Document } from "src/lib/enum/document/documents.enum";
import { Roles } from "src/lib/enum/roles/roles.enum";
import { IUserCreate } from "../../interfaces/create-user.interface";

export class UserCreateReponseDto implements IUserCreate {
    @Expose()    
    id?:string
    @Expose()
    createAt?: Date;
    @ApiProperty()
    @Expose()
    name?: string;
    @ApiProperty()
    @Expose()
    lastname?: string;
    @ApiProperty()
    @Expose()
    documentType?: Document;
    @ApiProperty()
    @Expose()
    documentNumber?: string;
    @ApiProperty()
    @Expose()
    email?: string;
    @Exclude()
    password?: string;
    @ApiProperty()
    @Expose()
    phone?: string;
    @ApiProperty()
    @Expose()
    age?: string;
    @ApiProperty()
    @Expose()
    role?: Roles;
};