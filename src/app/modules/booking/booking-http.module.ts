import {Module} from '@nestjs/common';
import {BookingService} from './booking.service';
import {BookingController} from './booking.controller';
import {BookingModule} from "../../shared/modules/booking/booking.module";

@Module({
    imports: [BookingModule],
    controllers: [BookingController],
    providers: [BookingService],
})
export class BookingHttpModule {
}
