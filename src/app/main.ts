import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import { Logger } from "@nestjs/common";
import { ValidationPipe } from '@nestjs/common';
import {config} from 'dotenv'
import {swaggerSetup} from "./shared/swagger/swagger.config";
config()

async function bootstrap() {
  const logger: Logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule)

  swaggerSetup(app)

  const port: string = process.env.PORT
  await app.listen(port);

  app.useGlobalPipes(new ValidationPipe())

  logger.log(`Server running on  http://localhost:${port}`);
  logger.log(`Swagger running on: http://localhost:${port}/api-docs#/}`)

}
bootstrap();


