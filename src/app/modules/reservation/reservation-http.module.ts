import {Module} from '@nestjs/common';
import {ReservationService} from './reservation.service';
import {ReservationController} from './reservation.controller';
import {ReservationModule} from "../../shared/modules/reservation/reservation.module";

@Module({
    imports: [ReservationModule],
    controllers: [ReservationController],
    providers: [ReservationService],
})
export class ReservationHttpModule {
}
