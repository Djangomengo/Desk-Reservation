import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WeekEnum } from '../../enums/week.enum';

@Injectable()
export class BookingRepository extends Repository<BookingEntity> {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<any>,
    private readonly entityManager: EntityManager,
  ) {
    super(BookingEntity, entityManager);
  }

  async createBooking(
    userId: number,
    deskId: number,
    day: WeekEnum,
  ): Promise<BookingEntity> {
    const booking: BookingEntity = await this.bookingRepository.create({
      userId,
      deskId,
      day,
    });
    return await this.bookingRepository.save(booking);
  }

  async findByDayAndDeskId(day: WeekEnum, deskId: number) {
    return await this.bookingRepository.findOne({
      where: {
        day,
        deskId,
      },
    });
  }
}
