import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/request/login-request.dto';
import { LoginResponseDto } from 'src/app/modules/auth/dtos/response/login-response.dto';
import { PasswordChangeRequestDto } from './dtos/request/password-change-request.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../shared/modules/user/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'login', description: `login` })
  @Post('login')
  @ApiBody({ type: LoginRequestDto })
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return {
      token: await this.authService.login(dto.email, dto.password),
    };
  }

  @ApiOperation({
    summary: 'change password',
  })
  @Post('change-password')
  @ApiBody({ type: PasswordChangeRequestDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async changePassword(
    @CurrentUser() currentUser: UserEntity,
    @Body() dto: PasswordChangeRequestDto,
  ): Promise<void> {
    await this.authService.changePassword(currentUser.id, dto.newPassword);
  }
}
