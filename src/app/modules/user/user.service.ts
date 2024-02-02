import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/app/shared/modules/user/user.repository';
import { UserEntity } from 'src/app/shared/modules/user/user.entity';
import { UpdateUserRequestDto } from './dtos/request/update-user-request.dto';
import { UserRequestDto } from 'src/app/modules/user/dtos/request/user-request.dto';
import {hashPassword} from "src/app/shared/utils/hash-password";

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async fetchAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findUserById(id);
    if(!(typeof id === 'number') ){
      this.logger.error(`BadRequestException: Invalid ID format received. Expected a number. Received ID: ${id}. Function: [FunctionName].`);
      throw new BadRequestException(`invalid id format. id must be a number.`)
    }
    if (!user) {
      this.logger.error(`NotFoundException: No user found in findUserById. Function: findUserById.`);
      this.throwNotFoundException('Error in findUserById Msg: no user found');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findUserByMail(email);
    if (!user) {
      this.logger.error(`NotFoundException: No user found in findUserByEmail. Function: findUserByEmail.`);
      this.throwNotFoundException('Error in findUserByEmail Msg: no user found');
    }
    return user;
  }

  async createUser(dto: UserRequestDto): Promise<UserEntity> {
    const dtoCopy: UserRequestDto = structuredClone(dto);
    const user: UserEntity = await this.userRepository.findUserByMail(dtoCopy.email);
    if (user) {
      this.logger.error(`NotFoundException: Email already used in createUser. Function: createUser.`);
      this.throwNotFoundException('Error in createUser Msg: mail already used');
    }
    dtoCopy.password = await hashPassword(dtoCopy.password);
    const entity: UserEntity = this.userRepository.create({...dtoCopy});
    this.logger.verbose(`user with email: ${dtoCopy.email} created`);
    return this.userRepository.save(entity);
  }

  async updateUser( dto: UpdateUserRequestDto, id: number): Promise<UserEntity> {
    const dtoCopy: UpdateUserRequestDto = structuredClone(dto)
    const user: UserEntity = await this.userRepository.findUserById(id);
    if (!user) {
      this.logger.error(`NotFoundException: User not found in updateUser. Function: updateUser.`);
      this.throwNotFoundException('Error in updateUser Msg: user not found');
    }
    await this.userRepository.update(id, dtoCopy);
    this.logger.verbose(`user with id: ${id} updated`);
    return user
  }

  async deleteUser(id: number): Promise<void> {
    const user: UserEntity = await this.userRepository.findUserById(id);
    if (!user) {
      this.logger.error(`NotFoundException: User not found in deleteUser. Function: deleteUser.`);
      this.throwNotFoundException( 'Error in deleteUser Msg: user not found');
    }
    await this.userRepository.delete(id);
    this.logger.verbose(`user with id: ${id} deleted`);
  }

  throwNotFoundException(errorMsg: string): void {
    this.logger.error(errorMsg);
    throw new NotFoundException(errorMsg);
  }
}
