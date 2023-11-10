import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { BookingRepository } from '../../shared/modules/booking/booking.repository';
import { DeskService } from '../desk/desk.service';
import { BookingEntity } from '../../shared/modules/booking/booking.entity';
import { CreateBookingRequestDto } from './dtos/request/createBooking.dto';
import { WeekEnum } from '../../shared/enums/week.enum';
import { SetDeskAsTakenDto } from '../desk/dtos/request/set-desk-as-taken.dto';

@Injectable()
export class BookingService {
  private logger: Logger = new Logger(BookingService.name);

  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly deskService: DeskService, //to do: create a fetchFeeDesk method
  ) {}

  async createBooking(
    userId: number,
    deskId: number,
    day: WeekEnum,
  ): Promise<BookingEntity> {
    const bookingExists: BookingEntity =
      await this.bookingRepository.findByDayAndDeskId(day, deskId);
    if (bookingExists) {
      throw new ConflictException(`booking already exists`);
    }

    await this.deskService.changeDeskStatus(deskId, true);

    return await this.bookingRepository.createBooking(userId, deskId, day);
  }
}
