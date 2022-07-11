import { IReservationRepository } from "../core/abstract/reservation-repository.abstract";
import { PgGenericRepository } from "./pg-generic.repository";

export class PgReservationRepository<T> 
    extends PgGenericRepository<T>
    implements IReservationRepository<T>
{
    public async findOneAllInformation(reservationId: string): Promise<T> {
        return await this._repository.createQueryBuilder('reservation')
            .select([
                'reservation.*', 
                'user', 
                'house'
            ])
            .leftJoinAndSelect('reservation.user', 'user')
            .leftJoinAndSelect('reservation.house', 'house')
            .where('reservation.id = :id', { id: reservationId })
            .getRawOne()
    };
};