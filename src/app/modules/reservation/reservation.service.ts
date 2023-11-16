import {
  BadRequestException,
  ConflictException, Delete,
  Injectable, Logger, NotFoundException, Param,
} from '@nestjs/common';
import { WeekEnum } from '../../shared/enums/week.enum';
import {DeleteResult} from "typeorm";
import {ReservationRepository} from "../../shared/modules/reservation/reservation.repository";
import {ReservationEntity} from "../../shared/modules/reservation/reservation.entity";

@Injectable()
export class ReservationService {
  private logger: Logger = new Logger(ReservationService.name)
  constructor(
    private readonly bookingRepository: ReservationRepository,
  ) {}

  async createReservation(
    userId: number,
    deskId: number,
    day: WeekEnum,
  ): Promise<ReservationEntity> {
    if (await this.bookingRepository.findByDayAndDeskId(day, deskId)) {
      throw new ConflictException(`reservation already exists`);
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
