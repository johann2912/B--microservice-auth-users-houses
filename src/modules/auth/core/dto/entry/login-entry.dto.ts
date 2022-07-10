import { ApiProperty } from "@nestjs/swagger";
import { Ilogin } from "../../interfaces/login.interface";

export class LoginDto implements Ilogin {
    @ApiProperty()
    email:string;
    @ApiProperty()
    password:string;
};