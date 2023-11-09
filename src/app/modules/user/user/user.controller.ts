import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post, UseGuards,
} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {UserResponseDto} from "./dtos/response/userResponse.dto";
import {CreateUserRequestDto} from "./dtos/request/createUserRequest.dto";
import {UpdateUserRequestDto} from "./dtos/request/updateUserRequest.dto";
import {UserEntity} from "../../../shared/modules/user/user.entity";
import {Public} from "../../../shared/decorators/is-public.decorator";
import {CurrentUser} from "../../../shared/decorators/current-user.decorator";
import {JwtAuthGuard} from "../../../shared/guards/jwt-auth.guard";

@ApiTags('user')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @ApiOperation({
        summary: 'Fetch all users'
    })
    @Get()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async fetchAll(): Promise<UserResponseDto[]> {
        const entities: UserEntity[] = await this.userService.fetchAll();
        return entities.map(userEntity => userEntity.toDto());
    }

    @Get('id/:id')
    //@UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Find by id'
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async findUserById(@Param('id') id: number): Promise<UserResponseDto> {
        const entity: UserEntity = await this.userService.findUserById(id);
        return entity.toDto();
    }

    @Public()
    @Post('create')
    @ApiOperation({
        summary: 'Create user'
    })
    @ApiBody({type: CreateUserRequestDto})
    async createUser(@Body() createUserRequestDto: CreateUserRequestDto): Promise<UserResponseDto> {
        createUserRequestDto.email = createUserRequestDto.email.toLowerCase()
        const entity: UserEntity = await this.userService.createUser(createUserRequestDto)
        return entity.toDto()
    }


    @Post('update/:id')
    @ApiOperation({
        summary: 'Update user'
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async updateUser(@CurrentUser() currentUser: UserEntity, @Body() updateUserRequestDto: UpdateUserRequestDto): Promise<UserResponseDto>{
        await this.userService.updateUser(updateUserRequestDto,currentUser.id)
        return {message: 'User updated successfully'}
    }

    @Delete('delete/:id')
    @ApiOperation({
        summary: 'Delete user'
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    async deleteUser(@CurrentUser() currentUser: UserEntity/*@CurrentUser() user: UserEntity*/): Promise<UserResponseDto> {
        await this.userService.deleteUser(currentUser.id)
        return {
            message: 'Successfully deleted user'
        }
    }
}
