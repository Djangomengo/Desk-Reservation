import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from "../../../shared/modules/user/user-repository";
import {UserListResponseDto} from "./dtos/response/userListResponseDto";
import {UserEntity} from "../../../shared/modules/user/user.entity";
import {UserResponseDto} from "./dtos/response/userResponse.dto";
import {UpdateUserRequestDto} from "./dtos/request/updateUserRequest.dto";
import {Logger} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import {CreateUserRequestDto} from "./dtos/request/createUserRequest.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async fetchAll(): Promise<UserListResponseDto> {
        const logger: Logger = new Logger('Service: fetchAll');
        const users: UserEntity[] = await this.userRepository.fetchAll();
        if (!users || users.length === 0) {
            logger.error('trying to fetch all users, but there are no users in database.');
            throw new NotFoundException('No users found.');
        }
        const userResponseDto = users.map(user => ({
            id: user.id,
            username: user.username
        }));
        logger.verbose('All users fetched successfully.');
        return plainToClass(UserListResponseDto, { users: userResponseDto });
    }

    async findUserById(id: number): Promise<UserResponseDto> {
        const logger: Logger = new Logger('Service: fetchById');
        const user: UserEntity = await this.userRepository.findeUserById(id)
        if (!user){
            logger.error(`Attempted to fetch a user with ID: ${id} that does not exist in database.`)
            throw new NotFoundException()
        }
        logger.verbose(`response with id: ${user.id} and username: ${user.username}`)
        return plainToClass(UserResponseDto,{
            id:`${user.id}`,
            username: user.username
        });
    }

    async createUser(createUserRequestDto: CreateUserRequestDto): Promise<UserResponseDto> {
        const logger: Logger= new Logger(`Service: createUser`)
        const exist: UserEntity = await this.userRepository.findUserByMail(createUserRequestDto.email)
        if (exist){
            logger.error(`Failed to create new user. Email: "${createUserRequestDto.email}" already exists in database.`)
            throw new ConflictException('User already exist with the provided email address')
        }
        const user: UserEntity = await this.userRepository.createUser(createUserRequestDto)
        logger.verbose(`Success: User: "${user.username}" was created successfully.`);
        return plainToClass(UserResponseDto, {
            username: user.username
        });
    }

    async updateUser(updateUserDto: UpdateUserRequestDto, id: number): Promise<UserResponseDto> {
        const logger: Logger = new Logger('Service: updateUser')
        const exist: UserEntity = await this.userRepository.findeUserById(id)
        if(!exist){
            logger.error(`Failed to update user with email: "${id}". Please check the input data and ensure the user exists in database.`)
            throw new NotFoundException('User dose not exist with the provided email address')
        }
        const user: UserEntity = await this.userRepository.updateUser(updateUserDto, id)
        logger.verbose(`Success: User: "${user.username}" was updated successfully.`);
        return plainToClass(UserResponseDto, {
            username: user.username
        });
    }

    async deleteUser(id: number): Promise<void>{
        const logger: Logger = new Logger(`Service: deleteUser`)
        const user = await this.userRepository.findeUserById(id)
        if (!user){
            logger.error('Failed to delete user Please check the input data and ensure the user exists in database.')
            throw new NotFoundException(`User does not exist with the provided id`)
        }
        logger.verbose(`user with id: ${id} has been deleted`)
        await this.userRepository.deleteUser(id)
    }

}

