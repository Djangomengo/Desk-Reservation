import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import {BookingTypeormModule} from "./booking-typeorm.module";
import {DeskService} from "../desk/desk.service";
import {DeskHttpModule} from "../desk/desk-http.module";

@Module({
  imports: [BookingTypeormModule, DeskHttpModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingHttpModule {}
