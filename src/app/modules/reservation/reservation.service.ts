import {
  BadRequestException,
  ConflictException, Delete,
  Injectable, Logger, NotFoundException, Param,
} from '@nestjs/common';
import { WeekEnum } from '../../shared/enums/week.enum';
import {DeleteResult} from "typeorm";
import {ReservationRepository} from "../../shared/modules/reservation/reservation.repository";
import {ReservationEntity} from "../../shared/modules/reservation/reservation.entity";
import {timestamp} from "rxjs";

@Injectable()
export class ReservationService {
  private logger: Logger = new Logger(ReservationService.name)
  constructor(
    private readonly bookingRepository: ReservationRepository,
  ) {}

  async createReservation(
    userId: number,
    deskId: number,
    dayStr: string,
  ): Promise<ReservationEntity> {
    const day: Date = new Date(dayStr)
    if(isNaN(day.getTime())){
      this.logger.error(`BadRequestException: Invalid date format received. Expected format: YYYY-MM-DD. Function: createReservation, User ID: ${userId}.`);
      throw new BadRequestException('Invalid date. Pleas use YYYY-MM-DD.')
    }
    if (await this.bookingRepository.findByDayAndDeskId(day, deskId)) {
      this.logger.error(`ConflictException: Reservation for desk: ${deskId} on day: ${day} already exists. Function: createReservation, User ID: ${userId}.`);
      throw new ConflictException(`reservation already exists`);
    }
    if(await this.bookingRepository.findByUserIdAndDay(day, userId)) {
      this.logger.error(`ConflictException: User with ID ${userId} already has a reservation for desk ID ${deskId} on date ${dayStr}. Function: createReservation.`);
      throw new ConflictException(`User with ID ${userId} already has a reservation for ${day.toISOString().split('T')[0]}.`
      )
    }
    const reservation: ReservationEntity = this.bookingRepository.create({
      userId,
      deskId,
      day,
    });
    this.logger.verbose('desk reserved ')
    return await this.bookingRepository.save(reservation);
  }

    async deleteReservation(id: number): Promise<void> {
      if(!(typeof id === 'number') ){
        throw new BadRequestException(`invalid id format. id must be a number.`)
      }

    const reservation: DeleteResult = await this.bookingRepository.delete(id);
    if (!reservation) {
      throw new NotFoundException(`Booking with ID ${id} not found.`);
    }
  }
}
