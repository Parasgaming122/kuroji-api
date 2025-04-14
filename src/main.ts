import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

import { config } from 'dotenv';
import { ExceptionsHandler } from './exception/handler/ExceptionsHandler'
import { PrismaService } from './prisma.service'
config();

Object.defineProperty(BigInt.prototype, 'toJSON', {
  get() {
    'use strict';
    return () => String(this);
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://veanime.cc',
      'https://www.veanime.cc',
    ],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Optionally, transforms payloads to DTOs
      whitelist: true, // Automatically remove properties that do not have decorators
      forbidNonWhitelisted: true, // Throws an error if unknown properties are provided
    }),
  );
  app.setGlobalPrefix('api');
  const prismaService = app.get(PrismaService)
  app.useGlobalFilters(new ExceptionsHandler(prismaService));
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
