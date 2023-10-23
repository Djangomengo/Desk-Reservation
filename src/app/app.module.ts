import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {config} from "dotenv";
import {getDatabaseConfig} from "./shared/database/database.config";

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configServise: ConfigService) => getDatabaseConfig(configServise)
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
