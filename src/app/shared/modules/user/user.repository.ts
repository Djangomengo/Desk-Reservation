import {ConflictException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository, EntityManager, createQueryBuilder} from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRequestDto } from '../../../modules/user/dtos/request/user-request.dto';
import { UpdateUserRequestDto } from '../../../modules/user/dtos/request/update-user-request.dto';
import {isNumber} from "class-validator";
import {UserRolesEnum} from "../../../modules/auth/enums/user-roles.enum";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private entityManager: EntityManager,
  ) {
    super(UserEntity, entityManager);
  }

  async findUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where:
          {
            id: id
          }
    });
  }

  async findUserByMail(email: string): Promise<UserEntity> {
    return this.createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', {
        email: email,
      })
      .getOne();
  }

  async promoteUserToAdmin(id: number): Promise<void>{
    await this.createQueryBuilder()
        .update(UserEntity)
        .set({role: UserRolesEnum.ADMIN})
        .where('id = :id', {id})
        .execute()
  }

  async revokeAdminPrivileges(id: number): Promise<void>{
    await this.createQueryBuilder()
        .update(UserEntity)
        .set({role: UserRolesEnum.USER})
        .where('id = :id', {id})
        .execute()
  }
}
