import { SwaggerConfig } from './config/swagger/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { LoggerService } from './config/logger/logger.service';
import { AllExceptionFilter } from './config/filter';
import { TimeoutInterceptor } from './config/interceptors/timeout';
import { ResponseInterceptor } from './config/interceptors/response';
import { LoggingInterceptor } from './config/interceptors/logger';

async function bootstrap() {
  const configService = new ConfigService();
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  app.useGlobalFilters(new AllExceptionFilter(logger));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api/v1/auth-users-houses/docs');
  app.use(
    'api/v1/auth-users-houses/docs',
    basicAuth({
      challenge: true,
      users: { Bidea: configService.get<string>('SWAGGER_PASS')}
    }),
  );
  SwaggerConfig.ConfigSwaggerModule(app);
  await app.listen(configService.get<number>('PORT'));
};
bootstrap();