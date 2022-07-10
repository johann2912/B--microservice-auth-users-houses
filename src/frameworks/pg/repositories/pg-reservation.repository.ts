import { IReservationRepository } from "../core/abstract/reservation-repository.abstract";
import { PgGenericRepository } from "./pg-generic.repository";

export class PgReservationRepository<T> 
    extends PgGenericRepository<T>
    implements IReservationRepository<T>
{};