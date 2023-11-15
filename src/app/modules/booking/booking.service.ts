import {
  ConflictException,
  Injectable, Logger,
} from '@nestjs/common';
import { BookingRepository } from '../../shared/modules/booking/booking.repository';
import { BookingEntity } from '../../shared/modules/booking/booking.entity';
import { WeekEnum } from '../../shared/enums/week.enum';

@Injectable()
export class BookingService {
  private logger: Logger = new Logger(BookingService.name)
  constructor(
    private readonly bookingRepository: BookingRepository,
  ) {}

  async createBooking(
    userId: number,
    deskId: number,
    day: WeekEnum,
  ): Promise<BookingEntity> {
    if (await this.bookingRepository.findByDayAndDeskId(day, deskId)) {
      throw new ConflictException(`booking already exists`);
    }

    const booking: BookingEntity = this.bookingRepository.create({
      userId,
      deskId,
      day,
    });
    this.logger.verbose('desk reserved ')
    return await this.bookingRepository.save(booking);
  }
}
