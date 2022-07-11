import { Module } from "@nestjs/common";
import { ExceptionsModule } from "src/config/exceptions/exceptions.module";
import { PgDatabaseModule } from "src/frameworks/pg/pg-data.module";
import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";

@Module({
    imports: [PgDatabaseModule, ExceptionsModule],
    controllers: [ReservationController],
    providers: [ReservationService],
})
export class ReservationModule {};
