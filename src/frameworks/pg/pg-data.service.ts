import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IDatabaseAbstract } from "./core/abstract/database.abstract";
import { IHouseRepository } from "./core/abstract/house-repository.abstract";
import { IReservationRepository } from "./core/abstract/reservation-repository.abstract";
import { IUserRepository } from "./core/abstract/user.repository.abstract";
import { House, Reservation, User } from "./entities";
import { PgHouseRepository } from "./repositories/pg-house.repository";
import { PgReservationRepository } from "./repositories/pg-reservation.repository";
import { PgUserRepository } from "./repositories/pg-user.repository";

@Injectable()
export class PgDatabaseService
  implements IDatabaseAbstract, OnApplicationBootstrap
{
  public users: IUserRepository<User>;
  public houses: IHouseRepository<House>;
  public reservations: IReservationRepository<Reservation>;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>
  ) {};

  public onApplicationBootstrap() {
    this.users = new PgUserRepository<User>(this.userRepository);
    this.houses = new PgHouseRepository<House>(this.houseRepository);
    this.reservations = new PgReservationRepository<Reservation>(this.reservationRepository);
  };
};