import {Injectable} from '@nestjs/common';
import {EntityManager, Repository} from 'typeorm';
import {DeskEntity} from './desk.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class DeskRepository extends Repository<DeskEntity> {
    constructor(
        @InjectRepository(DeskEntity)
        private readonly deskRepository: Repository<DeskEntity>,
        private entityManager: EntityManager,
    ) {
        super(DeskEntity, entityManager);
    }

}
