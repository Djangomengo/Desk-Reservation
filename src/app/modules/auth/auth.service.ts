import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user/user.service";
import {PasswordService} from "../password/password.service";
import {RegistryRequestDto} from "./dtos/request/registry.dto";
import {UserEntity} from "../../shared/modules/user/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService
    ) {}
/*
    async register(registryRequestDto: RegistryRequestDto): Promise<UserEntity> {
        const exist = await this.userService.findUserById()
    }

 */
}
