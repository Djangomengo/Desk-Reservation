import {Injectable} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {Repository, EntityManager} from "typeorm";
import {UserEntity} from "./user.entity";
import {UserFetchRequestDto} from "../../../modules/user/user/dtos/request/fetchUser.dto";

@Injectable()
export class UserRepository extends Repository<UserEntity>{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        private entityManager: EntityManager
    ) {
        super(UserEntity, entityManager);
    }

    fetchAll(): UserFetchRequestDto{

        return
    }


}