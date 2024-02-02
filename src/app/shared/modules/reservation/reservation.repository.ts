import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { ReservationEntity } from './reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservationRepository extends Repository<ReservationEntity> {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<any>,
    private readonly entityManager: EntityManager,
  ) {
    super(ReservationEntity, entityManager);
  }

  async findByDayAndDeskId(day: Date, deskId: number): Promise<boolean> {
    const query = this.createQueryBuilder('reservation')
        .where('reservation.deskId = :deskId', {deskId})
        .andWhere('reservation.day = :day', {
          day: day.toISOString().split('T'[0])})
        .select('1')
        .limit(1);
    const result = await query.getRawOne()
    return !!result
  }

  async findByUserIdAndDay(day: Date, userId: number): Promise<boolean> {
    const query = this.createQueryBuilder('reservation')
        .where('reservation.userId = :userId', {userId})
        .andWhere('reservation.day = :day', {
          day: day.toISOString().split('T'[0])})
        .select('1')
        .limit(1);
    const result = await query.getRawOne()
    return !!result
  }

  async findAllByDay(day: Date): Promise<ReservationEntity[]> {
    return this.reservationRepository
        .createQueryBuilder('reservation')
        .select('reservation.deskId')
        .where('reservation.day = :day', {
          day: day.toISOString().split('T'[0])})
        .getMany();
  }

}

