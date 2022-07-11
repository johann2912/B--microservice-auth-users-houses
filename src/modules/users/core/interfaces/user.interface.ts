import { Document } from "src/lib/enum/document/documents.enum";
import { Roles } from "src/lib/enum/roles/roles.enum";
import { IReservation } from "src/modules/reservation/core/interfaces/reservation.interface";

export interface IUser {
    id?:string
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    name?: string;
    lastname?: string;
    documentType?: Document;
    documentNumber?: string;
    email?: string;
    password?: string;
    phone?: string;
    age?: string;
    role?: Roles;
    reservation?: IReservation;
};