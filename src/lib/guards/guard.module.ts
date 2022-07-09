import { Global, Module } from '@nestjs/common';
import { ExceptionsModule } from 'src/config/exceptions/exceptions.module';
import { RedisModule } from 'src/frameworks/redis/redis.module';
import { GuardsService } from './guard.service';

@Global()
@Module({
  imports: [RedisModule, ExceptionsModule],
  providers: [GuardsService],
  exports: [GuardsService],
})
export class GuardsModule {};