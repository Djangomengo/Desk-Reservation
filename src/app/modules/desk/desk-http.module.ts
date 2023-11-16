import { Module } from '@nestjs/common';
import {DeskModule} from "../../shared/modules/desk/desk.module";
import {DeskController} from "./desk.controller";
import {DeskService} from "./desk.service";
import {ReservationModule} from "../../shared/modules/reservation/reservation.module";

@Module({
    imports: [DeskModule, ReservationModule],
    controllers: [DeskController],
    providers: [DeskService],
    exports: [DeskService]
})
export class DeskHttpModule {}
