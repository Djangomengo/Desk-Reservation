import {Injectable} from "@nestjs/common";
import {EntityManager, Repository} from "typeorm";
import {AuthEntity} from "./auth.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AuthRepository extends Repository<AuthEntity>{
    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        private entityManager: EntityManager
    ) {
        super(AuthEntity, entityManager);
    }

    async
}
