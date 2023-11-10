import { Injectable, Logger } from '@nestjs/common';
import { DeskRepository } from '../../shared/modules/desk/desk.repository';
import { DeskEntity } from '../../shared/modules/desk/desk.entity';
import { SetDeskAsTakenDto } from './dtos/request/set-desk-as-taken.dto';

@Injectable()
export class DeskService {
  private logger: Logger = new Logger();

  constructor(private readonly deskRepository: DeskRepository) {}

  async createDesk(): Promise<DeskEntity> {
    const desk: DeskEntity = await this.deskRepository.createDesk();
    this.logger.verbose('desk created');
    return this.deskRepository.save(desk);
  }

  async fetchFreeDesks(): Promise<DeskEntity[]> {
    return await this.deskRepository.fetchFreeDesks();
  }

  async changeDeskStatus(id: number, taken: boolean): Promise<any> {
    return this.deskRepository.updateStatusById(id, taken);
  }

  //methode zu ende schreiben die taken vom false auf true setzt
}
