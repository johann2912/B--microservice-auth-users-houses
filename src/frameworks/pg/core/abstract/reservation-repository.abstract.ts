import { IGenericRepository } from "./generic-repository.abstract";

export abstract class IReservationRepository<T> extends IGenericRepository<T> {
    public abstract findOneAllInformation(reservationId:string): Promise<T>;
};