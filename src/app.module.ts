import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PgDatabaseModule } from './frameworks/pg/pg-data.module';
import { AuthModule } from './modules/auth/auth.module';
import { HouseModule } from './modules/houses/house.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
  }),
  PgDatabaseModule,
  UserModule,
  AuthModule,
  HouseModule,
  ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
