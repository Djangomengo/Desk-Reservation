import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {UserService} from 'src/app/modules/user/user.service';
import {UserEntity} from '../../shared/modules/user/user.entity';
import {JwtService} from '@nestjs/jwt';
import {hashPassword} from 'src/app/shared/utils/hash-password';

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
      this.logger.error(`UnauthorizedException: User with email ${email} not found. Function: login.`);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!(await user.validatePassword(password))) {
      this.logger.error( `UnauthorizedException: User with email ${email} enter wrong password. Function: login.`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, id: user.id, role: user.role };

    this.logger.verbose(`user with id: ${user.id} logged in`)
    return await this.jwtService.signAsync(payload);
  }

  async changePassword(id: number, newPassword: string): Promise<void> {
    const user: UserEntity = await this.userService.findUserById(id);
    this.logger.verbose(`user with id: ${user.id} changed password`)
    user.password = await hashPassword(newPassword);
  }
}
