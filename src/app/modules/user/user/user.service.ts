import { Injectable } from '@nestjs/common';
import {UserRepository} from "../../../shared/modules/user/user-repository";
import {UserListResponseDto} from "./dtos/response/userListResponseDto";
import {UserEntity} from "../../../shared/modules/user/user.entity";
import {CreateUserRequestDto} from "./dtos/request/createUser.dto";
import {UserResponseDto} from "./dtos/response/userResponse.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async fatchAll(): Promise<UserListResponseDto> {
        const user: UserEntity[] = await this.userRepository.find();
        const response: UserListResponseDto = {
            users: user.map(user => ({
                id: user.id,
                username: user.username
            }))
        }
        return response
    }

    async fetchUserById(id: number): Promise<UserResponseDto> {

        try {
            const user: UserEntity = await this.userRepository.findOne({where: { id: id}})
            const response: UserResponseDto = {
                username: user.username
            }
            if (!user){
                throw new Error('User not found')
            }
            return response
        }catch (error) {
            throw new Error(`Error fetching user: ${error.message}`)
        }
    }

    async createUser(createUserRequestDto: CreateUserRequestDto): Promise<UserResponseDto> {
        const user = await this.userRepository.createUser(createUserRequestDto);
        return {
            username: user.username
        }
    }
}
