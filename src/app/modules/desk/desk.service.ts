import {BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {DeskEntity} from '../../shared/modules/desk/desk.entity';
import {WeekEnum} from "../../shared/enums/week.enum";
import {In, Not} from "typeorm";
import {DeskRepository} from "../../shared/modules/desk/desk.repository";
import {ReservationRepository} from "../../shared/modules/reservation/reservation.repository";
import {ReservationEntity} from "../../shared/modules/reservation/reservation.entity";

@Injectable()
export class DeskService {
  private logger: Logger = new Logger(DeskService.name)
  constructor(
      private readonly deskRepository: DeskRepository,
      private readonly reservation: ReservationRepository
  ) {}

  async createDesk(): Promise<DeskEntity> {
    const desk: DeskEntity = this.deskRepository.create();
    this.logger.verbose(`Desk created`)
    return this.deskRepository.save(desk);
  }

  async fetchFreeDesks(dayStr: string): Promise<DeskEntity[]> {
    const day: Date = new Date(dayStr)
    if(isNaN(day.getTime())){
      this.logger.error(`BadRequestException: Invalid date format received. Expected format: YYYY-MM-DD. Function: createReservation.`);
      throw new BadRequestException('Invalid date. Pleas use YYYY-MM-DD.')
    }

    this.logger.verbose(`Free desk's fetched`)
    const bookingsOnDay: ReservationEntity[] = await this.reservation.findAllByDay(day);
    const bookedDeskIds: number[] = bookingsOnDay.map((reservation) => reservation.deskId);
    return this.deskRepository.find({ where: {id: Not(In(bookedDeskIds))}});
  }

  async deleteDesk(id: number): Promise<void>{
    if(!(typeof id === 'number') ){
      this.logger.error(`BadRequestException: Invalid ID format received. Expected a number. Received ID: ${id}. Function: deleteDesk.`);
      throw new BadRequestException(`invalid id format. id must be a number.`)
    }

    const desk: DeskEntity = await this.deskRepository.findOne({where: { id:id }})
    if(!desk){
      this.logger.error(`NotFoundException: No desk found with provided ID. Received ID: ${id}. Function: deleteDesk.`);
      throw new NotFoundException(`no desk with id: ${id}` )
    }

    await this.deskRepository.delete(id)
    this.logger.verbose(`desk with id: ${id} deleted`)
  }
}
