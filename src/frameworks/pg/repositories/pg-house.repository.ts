import { IHouseRepository } from "../core/abstract/house-repository.abstract";
import { PgGenericRepository } from "./pg-generic.repository";

export class PgHouseRepository<T> 
    extends PgGenericRepository<T>
    implements IHouseRepository<T>
{};