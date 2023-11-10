import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/app/modules/user/user.service';
import { UserEntity } from '../../shared/modules/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/app/shared/utils/hash-password';

@Injectable()
export class AuthService {
  logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user: UserEntity = await this.userService.findUserByEmail(email);
    if (!user) {
      this.logger.error('login with wrong email');
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!(await user.validatePassword(password))) {
      this.logger.error('login with wrong password');
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, id: user.id };
    const accessToken: string = await this.jwtService.signAsync(payload);
    this.logger.verbose(`accessToken: Accepted!`);
    this.logger.verbose(`token: \n ${accessToken}`);
    return accessToken;
  }

  async changePassword(id: number, newPassword: string): Promise<void> {
    const user: UserEntity = await this.userService.findUserById(id);
    user.password = await hashPassword(newPassword);
    this.logger.verbose('user successfully updated');
  }
}
