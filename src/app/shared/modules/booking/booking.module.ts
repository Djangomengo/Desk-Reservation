import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BookingEntity} from "./booking.entity";
import {BookingRepository} from "./booking.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([BookingEntity])
    ],
    providers: [BookingRepository],
    exports: [BookingRepository]
})

export class BookingModule {
}