import { IHouse } from "src/modules/houses/core/interfaces/house.interface";
import { IUser } from "src/modules/users/core/interfaces/user.interface";

export interface IReservation {
    id?: string;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    dateStart?: Date;
    dateEnd?: Date;
    discountCode?:string
    user?: IUser;
    house?: IHouse;
}