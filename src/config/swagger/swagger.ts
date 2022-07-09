import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
  static ConfigSwaggerModule(app: INestApplication): void {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Auth, Houses, Clients - Services')
      .setDescription(
        `This service contains the CRUD of clients, CRUD of administrators, 
         CRUD of houses. NOTE: only administrators are allowed to create houses, 
         so that customers can book them.`,
      )
      .setVersion('v0.0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/auth-users-houses/docs', app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  };
};