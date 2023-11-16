import {ReservationEntity} from "../../../../shared/modules/reservation/reservation.entity";
import {Expose} from "class-transformer";

export class ReservationResponseDto {
    @Expose()
    reservation?: ReservationEntity;

    @Expose()
    message?: string;
}