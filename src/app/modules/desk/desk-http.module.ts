import { Module } from '@nestjs/common';
import {DeskModule} from "../../shared/modules/desk/desk.module";
import {DeskController} from "./desk.controller";
import {DeskService} from "./desk.service";
import {BookingModule} from "../../shared/modules/booking/booking.module";

@Module({
    imports: [DeskModule, BookingModule],
    controllers: [DeskController],
    providers: [DeskService],
    exports: [DeskService]
})
export class DeskHttpModule {}
