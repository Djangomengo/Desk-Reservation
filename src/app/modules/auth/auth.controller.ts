import {Body, Controller, Post, Put, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/request/login-request.dto';
import { AuthResponseDto } from 'src/app/modules/auth/dtos/response/auth-response.dto';
import { PasswordChangeRequestDto } from './dtos/request/password-change-request.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
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
  @ApiOkResponse({
    description: 'login successfully'
  })
  @ApiBadRequestResponse({
    description: 'check your inputs'
      })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @ApiNotFoundResponse({
    description: 'no user found'
  })
  async login(@Body() dto: LoginRequestDto): Promise<AuthResponseDto> {
    return {
      message: 'login ok',
      token: await this.authService.login(dto.email, dto.password),
    };
  }

  @Put('change-password')
  @ApiOperation({
    summary: 'change password',
  })
  @ApiBody({
    type: PasswordChangeRequestDto
  })
  @ApiOkResponse({
    description: 'update successfully'
  })
  @ApiBadRequestResponse({
    description: 'check your inputs'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error'
  })
  @ApiNotFoundResponse({
    description: 'no user found'
  })
  @ApiUnauthorizedResponse({
    description: 'unauthorized access'
  })
  async changePassword(@CurrentUser() currentUser: UserEntity, @Body() dto: PasswordChangeRequestDto): Promise<AuthResponseDto> {
    await this.authService.changePassword(currentUser.id, dto.newPassword);
    return {
      message: 'Password changed'
    };
  }
}
