import {ConflictException, Injectable, Logger} from '@nestjs/common';
import {BookingRepository} from "../../shared/modules/booking/booking.repository";
import {DeskService} from "../desk/desk.service";
import {BookingEntity} from "../../shared/modules/booking/booking.entity";
import {CreateBookingRequestDto} from "./dtos/request/createBooking.dto";

@Injectable()
export class BookingService {
    private logger: Logger = new Logger(BookingService.name)

    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly deskService: DeskService //to do: create a fetchFeeDesk method
    ) {}

    async createBooking(createBookingRequestDto: CreateBookingRequestDto): Promise <BookingEntity> {

        const exist: BookingEntity = await this.bookingRepository.findByBooked(createBookingRequestDto)
        if (exist) {
            throw new ConflictException(`booking already exists`)
        }
        return await this.bookingRepository.createBooking(createBookingRequestDto)
    }
}
