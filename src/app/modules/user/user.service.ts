import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/app/shared/modules/user/user.repository';
import { UserEntity } from 'src/app/shared/modules/user/user.entity';
import { UpdateUserRequestDto } from 'src/app/modules/user/dtos/request/updateUserRequest.dto';
import { CreateUserRequestDto } from 'src/app/modules/user/dtos/request/createUserRequest.dto';
import {hashPassword} from "src/app/shared/utils/hash-password";

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async fetchAll(): Promise<UserEntity[]> {
    return await this.userRepository.fetchAll();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findUserById(id);
    if (!user) {
      this.throwNotFoundException();
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findUserByMail(email);
    if (!user) {
      this.throwNotFoundException();
    }
    return user;
  }

  async createUser(dto: CreateUserRequestDto): Promise<UserEntity> {
    const dtoCopy = structuredClone(dto);

    const userExist: UserEntity = await this.userRepository.findUserByMail(
      dtoCopy.email,
    );
    if (userExist) {
      this.throwNotFoundException();
    }
    dtoCopy.password = await hashPassword(
      dtoCopy.password,
    );
    const user: UserEntity = await this.userRepository.createUser(dtoCopy);
    this.logger
      .verbose(`Success: User: "${user.username}" was created successful
         ly.`);
    return user;
  }

  //IN SERVICE: check if ID matches: restrict to own data only if true
  async updateUser(
    updateUserDto: UpdateUserRequestDto,
    id: number,
  ): Promise<UserEntity> {
    const exist: UserEntity = await this.userRepository.findUserById(id);
    if (!exist) {
      this.throwNotFoundException();
    }
    const user: UserEntity = await this.userRepository.updateUser(
      updateUserDto,
      id,
    );
    this.logger.verbose(
      `Success: User: "${user.username}" was updated successfully.`,
    );
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      this.throwNotFoundException();
    }
    this.logger.verbose(`user with id: ${id} has been deleted`);
    await this.userRepository.deleteUser(id);
  }

  throwNotFoundException(): void {
    this.logger.error('User could not be found');
    throw new NotFoundException(`User could not be found`);
  }
}
