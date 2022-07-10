import { Module } from '@nestjs/common';
import { ExceptionsModule } from 'src/config/exceptions/exceptions.module';
import { PgDatabaseModule } from 'src/frameworks/pg/pg-data.module';
import { RedisModule } from 'src/frameworks/redis/redis.module';
import { GuardsModule } from 'src/lib/guards/guard.module';
import { JWTModule } from 'src/lib/jwt/jwt.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        PgDatabaseModule, 
        ExceptionsModule,
        JWTModule, 
        RedisModule,
        GuardsModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {};
