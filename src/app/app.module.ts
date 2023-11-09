import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getDatabaseConfig} from "./shared/database/database.config";
import {UserHttpModule} from "./modules/user/user/user-http.module";
import {AuthHttpModule} from "./modules/auth/auth-http.module";
import {DeskHttpModule} from "./modules/desk/desk-http.module";
import {BookingHttpModule} from "./modules/booking/booking-http.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./shared/guards/jwt-auth.guard";

@Module({
  imports: [
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => getDatabaseConfig(configService)
      }),
      UserHttpModule,
      AuthHttpModule,
      DeskHttpModule,
      BookingHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
