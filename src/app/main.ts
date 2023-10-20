import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import { Logger } from "@nestjs/common";
import {config} from 'dotenv'
config()

async function bootstrap() {
  const logger: Logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule)

  const port = process.env.PORT
  await app.listen(port);
  logger.log(`Server running on  http://localhost:${port}`);
}
bootstrap();
