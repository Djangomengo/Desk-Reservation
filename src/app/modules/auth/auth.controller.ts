import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/request/login-request.dto';
import { AuthResponseDto } from 'src/app/modules/auth/dtos/response/auth-response.dto';
import { PasswordChangeRequestDto } from './dtos/request/password-change-request.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../shared/modules/user/user.entity';
import {Public} from "../../shared/decorators/is-public.decorator";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'login',
    description: `login`
  })
  @ApiBody({
    type: LoginRequestDto
  })
  async login(@Body() dto: LoginRequestDto): Promise<AuthResponseDto> {
    return {
      message: 'login ok',
      token: await this.authService.login(dto.email, dto.password),
    };
  }

  @Post('change-password')
  @ApiOperation({
    summary: 'change password',
  })
  @ApiBody({
    type: PasswordChangeRequestDto
  })
  async changePassword(
    @CurrentUser() currentUser: UserEntity,
    @Body() dto: PasswordChangeRequestDto,
  ): Promise<AuthResponseDto> {
    await this.authService.changePassword(currentUser.id, dto.newPassword);
    return {
      message: 'Password changed'
    };
  }
}
