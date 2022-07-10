import { IUser } from "./user.interface";

export interface IUserPasswordUpdate extends IUser {
    id?:string
    password?: string;
    newPassword?: string;
}