import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { ReservationEntity } from './reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WeekEnum } from '../../enums/week.enum';

@Injectable()
export class ReservationRepository extends Repository<ReservationEntity> {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<any>,
    private readonly entityManager: EntityManager,
  ) {
    super(ReservationEntity, entityManager);
  }

  async findByDayAndDeskId(day: WeekEnum, deskId: number): Promise<boolean> {
    const query = this.createQueryBuilder('reservation')
        .where('reservation.deskId = :deskId', {deskId})
        .andWhere('reservation.day = :day', {day})
        .select('1')
        .limit(1);
    const result = await query.getRawOne()
    return !!result
  }

  async findAllByDay(day: WeekEnum): Promise<ReservationEntity[]> {
    return this.reservationRepository
        .createQueryBuilder('reservation')
        .select('reservation.deskId')
        .where('reservation.day = :day', {day})
        .getMany();
  }

}

