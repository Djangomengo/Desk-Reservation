import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginRequestDto} from "./dtos/request/login.dto";
import {AuthResponseDto} from "./dtos/response/auth-response.dto";
import {Public} from "../../shared/decorators/is-public.decorator";
import {PasswordChangeRequestDto} from "./dtos/request/passwordChange.dto";
import {CurrentUser} from "../../shared/decorators/current-user.decorator";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "../../shared/modules/user/user.entity";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @ApiOperation({
            summary: 'login',
            description: `login`
        }
    )
    @Public()
    @Post('login')
    @ApiBody({type: LoginRequestDto})
    async login(@Body() loginRequestDto: LoginRequestDto): Promise<AuthResponseDto> {
        await this.authService.login(loginRequestDto);
        return {message: `login successfully`}
    }

    @ApiOperation({
        summary: 'change password'
    })
    @Post('change-password')
    @ApiBody({type: PasswordChangeRequestDto})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    async changePassword(@CurrentUser() currentUser: UserEntity, @Body() passwordChangeRequestDto: PasswordChangeRequestDto): Promise<AuthResponseDto> {
        await this.authService.changePassword(passwordChangeRequestDto, currentUser.id)
        return {message: 'Password successfully changed'}
    }

    @Get('test/test/test')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async test (@CurrentUser() currentUser: UserEntity): Promise<void>{
        const currentUsersId: number = await currentUser.id
        console.log(`id in der test methode: ${currentUsersId}`)
    }
}

