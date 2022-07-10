import { House, Reservation, User } from "../../entities";
import { IHouseRepository } from "./house-repository.abstract";
import { IReservationRepository } from "./reservation-repository.abstract";
import { IUserRepository } from "./user.repository.abstract";

export abstract class IDatabaseAbstract {
    public abstract readonly users: IUserRepository<User>;
    public abstract readonly houses: IHouseRepository<House>;
    public abstract readonly reservations: IReservationRepository<Reservation>;
};