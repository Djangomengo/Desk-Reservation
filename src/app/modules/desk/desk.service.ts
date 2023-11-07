import {Injectable, Logger} from '@nestjs/common';
import {DeskRepository} from "../../shared/modules/desk/desk.repository";
import {DeskEntity} from "../../shared/modules/desk/desk.entity";

@Injectable()
export class DeskService {
    private logger: Logger = new Logger()

    constructor(
        private readonly deskRepository: DeskRepository,
    ) {}


    async createDesk(): Promise<DeskEntity> {
        const desk: DeskEntity = await this.deskRepository.createDesk()
        this.logger.verbose('desk created')
        return this.deskRepository.save(desk)
    }

    async fetchAll(): Promise<DeskEntity[]> {
        return await this.deskRepository.fetchAll();
    }

    async
}
