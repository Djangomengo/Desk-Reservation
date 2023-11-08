import {Injectable} from "@nestjs/common";
import {EntityManager, Repository} from "typeorm";
import {BookingEntity} from "./booking.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/user.entity";
import {WeekEnum} from "../../enums/week.enum";
import {CreateBookingRequestDto} from "../../../modules/booking/dtos/request/createBooking.dto";

@Injectable()
export class BookingRepository extends Repository<BookingEntity> {

    constructor(
        @InjectRepository(BookingEntity)
        private readonly bookingRepository: Repository<any>,
        private readonly entityManager: EntityManager
    ) {
        super(BookingEntity,entityManager);
    }

    async createBooking(createBookingRequestDto: CreateBookingRequestDto): Promise <BookingEntity> {
        const booking: BookingEntity = await this.bookingRepository.create(createBookingRequestDto)
        return await this.bookingRepository.save(booking)
    }

    async findByBooked(createBookingRequestDto: CreateBookingRequestDto){
        return await this.bookingRepository.findOne({
            where:
                {
                    userId: createBookingRequestDto.userId,
                    day: createBookingRequestDto.day,
                    deskId: createBookingRequestDto.deskId
                }
        });
    }

}