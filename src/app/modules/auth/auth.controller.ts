import {Body, Controller, Param, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginRequestDto} from "./dtos/request/login.dto";
import {AuthResponseDto} from "./dtos/response/auth-response.dto";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Public} from "../../shared/decorators/is_public.decorator";
import {PasswordChangeRequestDto} from "./dtos/request/passwordChange.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @ApiOperation({
        summary: 'login',
        description: `login`
        }
    )
    @Public()
    @Post('login')
    @ApiBody({type: LoginRequestDto})
    async login (@Body() loginRequestDto: LoginRequestDto): Promise<AuthResponseDto>{
        await this.authService.login(loginRequestDto);
        return {message: `login successfully`}
    }

    @ApiOperation({
        summary: 'change password'
    })
    @Post('change-password')
    @ApiBody({type: PasswordChangeRequestDto})
    @ApiBearerAuth()
    async changePassword(@Param('id') id: number ,@Body() passwordChangeRequestDto: PasswordChangeRequestDto): Promise<AuthResponseDto> {
        await this.authService.changePassword(passwordChangeRequestDto, id)
        return {message: 'Password successfully changed'}
    }
}
