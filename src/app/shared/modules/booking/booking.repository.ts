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

  async findByDayAndDeskId(day: WeekEnum, deskId: number): Promise<boolean> {
    const query = this.createQueryBuilder('booking')
        .where('booking.deskId = :deskId', {deskId})
        .andWhere('booking.day = :day', {day})
        .select('1')
        .limit(1);
    const result = await query.getRawOne()
    return !!result
  }

  async findAllByDay(day: WeekEnum): Promise<BookingEntity[]> {
    return this.bookingRepository
        .createQueryBuilder('booking')
        .select('booking.deskId')
        .where('booking.day = :day', {day})
        .getMany();
  }
}

