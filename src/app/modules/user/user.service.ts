import {
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

    if (!user) {
      this.throwNotFoundException('Error in findUserById Msg: no user found');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findUserByMail(email);

    if (!user) {
      this.throwNotFoundException('Error in findUserByEmail Msg: no user found');
    }

    return user;
  }

  async createUser(dto: UserRequestDto): Promise<UserEntity> {
    const dtoCopy: UserRequestDto = structuredClone(dto);
    const user: UserEntity = await this.userRepository.findUserByMail(dtoCopy.email);

    if (user) {
      this.throwNotFoundException('Error in createUser Msg: mail already used');
    }

    dtoCopy.password = await hashPassword(dtoCopy.password);
    const entity: UserEntity = this.userRepository.create({...dtoCopy});
    this.logger.verbose(`user with id: ${dtoCopy.email} deleted`);
    return this.userRepository.save(entity);
  }

  async updateUser( dto: UpdateUserRequestDto, id: number): Promise<UserEntity> {
    const dtoCopy: UpdateUserRequestDto = structuredClone(dto)
    const user: UserEntity = await this.userRepository.findUserById(id);

    if (!user) {
      this.throwNotFoundException('Error in updateUser Msg: user not found');
    }

    await this.userRepository.update(id, dtoCopy);
    this.logger.verbose(`user with id: ${id} updated`);
    return user
  }

  async deleteUser(id: number): Promise<void> {
    const user: UserEntity = await this.userRepository.findUserById(id);

    if (!user) {
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
