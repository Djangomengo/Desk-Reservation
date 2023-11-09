import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user/user.service";
import {LoginRequestDto} from "./dtos/request/login.dto";
import * as bcrypt from 'bcrypt';
import {UserEntity} from "../../shared/modules/user/user.entity";
import {PasswordChangeRequestDto} from "./dtos/request/passwordChange.dto";
import {PasswordService} from "../password/password.service";
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class AuthService {
    logger: Logger = new Logger(AuthService.name)
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService
    ) {}

    async login(loginRequestDto: LoginRequestDto): Promise<{ accessToken: string }> {
        const user: UserEntity = await this.userService.findUserByEmail(loginRequestDto.email)
        if(!user){
            this.logger.error('login with wrong email')
            throw new UnauthorizedException('Invalid credentials')
        }

        const isPasswordValid: boolean = await bcrypt.compare(loginRequestDto.password, user.password)
        if(!isPasswordValid){
            this.logger.error('login with wrong password')
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload = {username: user.username, id: user.id}
        const accessToken: string = await this.jwtService.signAsync(payload)
        this.logger.verbose(`accessToken: Accepted!`)
        this.logger.verbose(`token: \n ${accessToken}`)
        return { accessToken }
    }

    async changePassword(passwordChangeRequestDto: PasswordChangeRequestDto, id: number): Promise<void> {
        const user: UserEntity = await this.userService.findUserById(id)
        user.password = await this.passwordService.hashPassword(passwordChangeRequestDto.newPassword)
        this.logger.verbose('user successfully updated')
    }
}
