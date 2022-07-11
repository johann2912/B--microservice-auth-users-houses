import { Reservation } from "src/frameworks/pg/entities";
import { StatusHouse } from "src/lib/enum/status-house/status-home.enum";

export interface IHouse {
    id?: string;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    countryAndCity?: string;
    address?: string;
    area?: string;
    statusHouse?: StatusHouse;
    reservation?: Reservation;
}