import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from "../../../shared/modules/user/user-repository";
import {UserEntity} from "../../../shared/modules/user/user.entity";
import {UpdateUserRequestDto} from "./dtos/request/updateUserRequest.dto";
import {Logger} from "@nestjs/common";
import {CreateUserRequestDto} from "./dtos/request/createUserRequest.dto";
import {PasswordService} from "../../password/password.service";

@Injectable()
export class UserService {
    private logger: Logger = new Logger(UserService.name);
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordService: PasswordService) {}

    async fetchAll(): Promise<UserEntity[]> {
        const users: UserEntity[] = await this.userRepository.fetchAll();
        return users;
    }


    async findUserById(id: number): Promise<UserEntity> {
        const user: UserEntity = await this.userRepository.findeUserById(id)
        if (!user){
            this.logger.error(`Attempted to fetch a user with ID: ${id} that does not exist in database.`)
            throw new NotFoundException()
        }
        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user: UserEntity = await this.userRepository.findUserByMail(email)
        if (!user){
            this.logger.error(`Attempted to fetch a user with email: ${email} that does not exist in database.`)
            throw new NotFoundException()
        }
        return user;
    }

    async createUser(createUserRequestDto: CreateUserRequestDto): Promise<UserEntity> {
        const exist: UserEntity = await this.userRepository.findUserByMail(createUserRequestDto.email)
        if (exist){
            this.logger.error(`Failed to create new user. Email: "${createUserRequestDto.email}" already exists in database.`)
            throw new ConflictException('User already exist with the provided email address')
        }
        createUserRequestDto.password = await this.passwordService.hashPassword(createUserRequestDto.password)
        const user: UserEntity = await this.userRepository.createUser(createUserRequestDto)
        this.logger.verbose(`Success: User: "${user.username}" was created successful
         ly.`);
        return user;
    }

    //IN SERVICE: check if ID matches: restrict to own data only if true
    async updateUser(updateUserDto: UpdateUserRequestDto, id: number): Promise<UserEntity> {
        const exist: UserEntity = await this.userRepository.findeUserById(id)
        if(!exist){
            this.logger.error(`Failed to update user with email: "${id}". Please check the input data and ensure the user exists in database.`)
            throw new NotFoundException('User dose not exist with the provided email address')
        }
        const user: UserEntity = await this.userRepository.updateUser(updateUserDto, id)
        this.logger.verbose(`Success: User: "${user.username}" was updated successfully.`);
        return user;
    }

    async deleteUser(id: number): Promise<UserEntity>{
        const user = await this.userRepository.findeUserById(id)
        if (!user){
            this.logger.error('Failed to delete user Please check the input data and ensure the user exists in database.')
            throw new NotFoundException(`User does not exist with the provided id`)
        }
        this.logger.verbose(`user with id: ${id} has been deleted`)
        await this.userRepository.deleteUser(id)
        return user
    }
}

