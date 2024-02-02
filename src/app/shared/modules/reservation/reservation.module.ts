import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReservationEntity} from "./reservation.entity";
import {ReservationRepository} from "./reservation.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReservationEntity])
    ],
    providers: [ReservationRepository],
    exports: [ReservationRepository]
})

export class ReservationModule {
}