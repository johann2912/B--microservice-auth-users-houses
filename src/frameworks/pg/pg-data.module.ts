import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IDatabaseAbstract } from "./core/abstract/database.abstract";
import * as entities from './entities';
import { PgDatabaseService } from "./pg-data.service";

@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule.forRoot({})],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            type: 'postgres',
            host: configService.get('PGHOST'),
            port: configService.get('PGPORT'),
            username: configService.get('PGUSER'),
            password: configService.get('PGPASSWORD'),
            database: configService.get('PGDATABASE'),
            logging: false,
            entities: Object.values(entities),
            synchronize: false,
          };
        },
      }),
      TypeOrmModule.forFeature(Object.values(entities)),
    ],
    providers: [
      {
        provide: IDatabaseAbstract,
        useClass: PgDatabaseService,
      },
    ],
    exports: [IDatabaseAbstract],
  }) 
  export class PgDatabaseModule {}