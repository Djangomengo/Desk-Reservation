import {BookingEntity} from "../../../../shared/modules/booking/booking.entity";

export class BookingResponseDto {
    booking?: BookingEntity;
    message?: string;
}