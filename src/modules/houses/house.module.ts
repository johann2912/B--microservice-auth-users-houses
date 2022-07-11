import { Module } from '@nestjs/common';
import { ExceptionsModule } from 'src/config/exceptions/exceptions.module';
import { PgDatabaseModule } from 'src/frameworks/pg/pg-data.module';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';

@Module({
    imports: [PgDatabaseModule, ExceptionsModule],
    controllers: [HouseController],
    providers: [HouseService],
})
export class HouseModule {};
