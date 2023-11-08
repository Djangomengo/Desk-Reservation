import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BookingEntity} from "../../shared/modules/booking/booking.entity";
import {BookingRepository} from "../../shared/modules/booking/booking.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([BookingEntity,BookingRepository])
    ],
    providers: [BookingRepository],
    exports: [BookingRepository]
})

export class BookingTypeormModule {}