import {Injectable} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {Repository, EntityManager} from "typeorm";
import {UserEntity} from "./user.entity";
import {UserFetchRequestDto} from "../../../modules/user/user/dtos/request/fetchUser.dto";
import {CreateUserRequestDto} from "../../../modules/user/user/dtos/request/createUser.dto";

@Injectable()
export class UserRepository extends Repository<UserEntity>{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private entityManager: EntityManager
    ) {
        super(UserEntity, entityManager);
    }

    async fatchAll(): Promise<UserEntity[]> {
        return  this.userRepository.find()
    }
    async fetchUserById(id: number): Promise<UserEntity>{
        return await this.userRepository.findOne({where: {id: id}})
    }

    async createUser(createUserRequestDto: CreateUserRequestDto): Promise<UserEntity> {
        const user = this.userRepository.create(createUserRequestDto)
        return await this.userRepository.save(user)
    }



}