import { StatusHouse } from "src/lib/enum/status-house/status-home.enum";
import { IReservation } from "src/modules/reservation/core/interfaces/reservation.interface";

export interface IHouse {
    id?: string;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    countryAndCity?: string;
    address?: string;
    area?: string;
    statusHouse?: StatusHouse;
    reservation?: IReservation;
}