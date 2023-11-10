import {BadRequestException, ConflictException, Injectable, Logger} from '@nestjs/common';
import {BookingRepository} from "../../shared/modules/booking/booking.repository";
import {DeskService} from "../desk/desk.service";
import {BookingEntity} from "../../shared/modules/booking/booking.entity";
import {CreateBookingRequestDto} from "./dtos/request/createBooking.dto";
import {WeekEnum} from "../../shared/enums/week.enum";
import {SetDeskAsTakenDto} from "../desk/dtos/request/set-desk-as-taken.dto";

@Injectable()
export class BookingService {
    private logger: Logger = new Logger(BookingService.name)

    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly deskService: DeskService //to do: create a fetchFeeDesk method
    ) {}

    async createBooking(createBookingRequestDto: CreateBookingRequestDto, setDeskAsTakenDto: SetDeskAsTakenDto): Promise <BookingEntity> {
        const exist: BookingEntity = await this.bookingRepository.findByBooked(createBookingRequestDto)

        if(!(createBookingRequestDto.day in WeekEnum )){
            throw new BadRequestException('the day provided is not valid')
        }
        if (exist) {
            throw new ConflictException(`booking already exists`)
        }

        await this.deskService.setDeskAsTaken(setDeskAsTakenDto,createBookingRequestDto.deskId)


        return await this.bookingRepository.createBooking(createBookingRequestDto)
    }
}
