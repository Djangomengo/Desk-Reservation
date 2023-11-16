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

  async fetchFreeDesks(day: WeekEnum): Promise<DeskEntity[]> {
    if(!(day in WeekEnum) ) {
      throw new NotFoundException('provided day not comprehend ')
    }

    this.logger.verbose(`Free desk's fetched`)
    const bookingsOnDay: ReservationEntity[] = await this.reservation.findAllByDay(day);
    const bookedDeskIds: number[] = bookingsOnDay.map((reservation) => reservation.deskId);
    return this.deskRepository.find({ where: {id: Not(In(bookedDeskIds))}});
  }

  async deleteDesk(id: number): Promise<void>{
    if(!(typeof id === 'number') ){
      throw new BadRequestException(`invalid id format. id must be a number.`)
    }

    const desk: DeskEntity = await this.deskRepository.findOne({where: { id:id }})
    if(!desk){
      this.logger.error('deleteDesk err: no such id found')
      throw new NotFoundException(`no desk with id: ${id}` )
    }

    await this.deskRepository.delete(id)
    this.logger.verbose(`desk with id: ${id} deleted`)
  }
}
