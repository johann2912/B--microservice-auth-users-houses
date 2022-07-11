import { StatusHouse } from "src/lib/enum/status-house/status-home.enum";
import { IHouse } from "./house.interface";

export interface ICreateHouse extends IHouse {
    id?: string;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    countryAndCity?: string;
    address?: string;
    area?: string;
    statusHouse?: StatusHouse;
}