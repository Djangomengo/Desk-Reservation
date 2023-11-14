import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { BookingRepository } from '../../shared/modules/booking/booking.repository';
import { BookingEntity } from '../../shared/modules/booking/booking.entity';
import { WeekEnum } from '../../shared/enums/week.enum';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
  ) {}

  async createBooking(
    userId: number,
    deskId: number,
    day: WeekEnum,
  ): Promise<BookingEntity> {
    const bookingExists: boolean =
      await this.bookingRepository.findByDayAndDeskId(day, deskId);
    if (bookingExists) {
      throw new ConflictException(`booking already exists`);
    }

    return await this.bookingRepository.createBooking(userId, deskId, day);
  }
}
