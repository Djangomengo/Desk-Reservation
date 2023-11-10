import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserRequestDto } from '../../../modules/user/dtos/request/createUserRequest.dto';
import { UpdateUserRequestDto } from '../../../modules/user/dtos/request/updateUserRequest.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private entityManager: EntityManager,
  ) {
    super(UserEntity, entityManager);
  }

  async fetchAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  async findUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findUserByMail(email: string): Promise<UserEntity> {
    return this.createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', {
        email: email,
      })
      .getOne();
  }

  async createUser(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<UserEntity> {
    const user: UserEntity = this.userRepository.create(createUserRequestDto);
    return await this.userRepository.save(user);
  }

  async updateUser(
    updateUserRequestDto: UpdateUserRequestDto,
    id: number,
  ): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserRequestDto);
    return this.userRepository.findOne({ where: { id: id } });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
