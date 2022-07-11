import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
  static ConfigSwaggerModule(app: INestApplication): void {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Bookings service')
      .setDescription(
        `This service contains the CRUD of clients, CRUD of administrators, 
        CRUD of houses. NOTE: only administrators can create houses, 
        so that customers can book them. It will also keep track of the reservations 
        made by a customer, and validate the coupons by connecting to the 
        coupon discount microservice. `,
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