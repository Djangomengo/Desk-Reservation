import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { DeskEntity } from './desk.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SetDeskAsTakenDto } from '../../../modules/desk/dtos/request/set-desk-as-taken.dto';

@Injectable()
export class DeskRepository extends Repository<DeskEntity> {
  constructor(
    @InjectRepository(DeskEntity)
    private readonly deskRepository: Repository<DeskEntity>,
    private entityManager: EntityManager,
  ) {
    super(DeskEntity, entityManager);
  }

  async createDesk(): Promise<DeskEntity> {
    const desk: DeskEntity = this.deskRepository.create();
    return this.deskRepository.save(desk);
  }

  async fetchFreeDesks(): Promise<DeskEntity[]> {
    return this.deskRepository.find({
      where: {
        taken: false,
      },
    });
  }
  //
  // async setDeskAsTaken(
  //   setDeskAsTakenDto: SetDeskAsTakenDto,
  //   id: number,
  // ): Promise<void> {
  //   // await this
  //   //     .createQueryBuilder()
  //   //     .update(DeskEntity)
  //   //     .set({taken: true})
  //   //     .where
  // }

  async updateStatusById(id: number, taken: boolean): Promise<void> {

  }
}
