import {Injectable, NotFoundException} from '@nestjs/common';
import {DeskRepository} from '../../shared/modules/desk/desk.repository';
import {DeskEntity} from '../../shared/modules/desk/desk.entity';
import {BookingRepository} from "../../shared/modules/booking/booking.repository";
import {WeekEnum} from "../../shared/enums/week.enum";
import {In, Not} from "typeorm";
import {BookingEntity} from "../../shared/modules/booking/booking.entity";

@Injectable()
export class DeskService {
  constructor(
      private readonly deskRepository: DeskRepository,
      private readonly bookingRepository: BookingRepository
  ) {}

  async createDesk(): Promise<DeskEntity> {
    const desk: DeskEntity = await this.deskRepository.createDesk();
    return this.deskRepository.save(desk);
  }

  async fetchFreeDesks(day: WeekEnum): Promise<DeskEntity[]> {

    if(!(day in WeekEnum) ) {
      throw new NotFoundException('provided day not comprehend ')
    }

    const bookingsOnDay: BookingEntity[] = await this.bookingRepository.findAllByDay(day);
    const bookedDeskIds: number[] = bookingsOnDay.map((booking) => booking.deskId);
    return this.deskRepository.find({ where: {id: Not(In(bookedDeskIds))}});
  }
}
