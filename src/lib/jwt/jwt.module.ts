import { ExceptionsModule } from 'src/config/exceptions/exceptions.module';
import { JWTService } from './jwt.service';
import { RedisModule } from 'src/frameworks/redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [RedisModule, ConfigModule, ExceptionsModule],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {};