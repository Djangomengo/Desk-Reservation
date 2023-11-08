import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post,
} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {UserResponseDto} from "./dtos/response/userResponse.dto";
import {CreateUserRequestDto} from "./dtos/request/createUserRequest.dto";
import {UpdateUserRequestDto} from "./dtos/request/updateUserRequest.dto";
import {UserEntity} from "../../../shared/modules/user/user.entity";
import {Public} from "../../../shared/decorators/is-public.decorator";
import {CurrentUserId} from "../../../shared/decorators/current-user.decorator";

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
    async fetchAll(): Promise<UserResponseDto[]> {
        const entities: UserEntity[] = await this.userService.fetchAll();
        return entities.map(userEntity => userEntity.toDto());
    }

    @Get('id/:id')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Find by id'
    })
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

    @ApiBearerAuth()
    @Post('update/:id')
    @ApiOperation({
        summary: 'Update user'
    })
    async updateUser(@CurrentUserId() id: number,@Body() updateUserRequestDto: UpdateUserRequestDto): Promise<UserResponseDto>{
        console.log('userid', id)
        await this.userService.updateUser(updateUserRequestDto,id)
        return {message: 'User updated successfully'}
    }

    @Delete('delete/:id')
    @ApiOperation({
        summary: 'Delete user'
    })
    @ApiBearerAuth()
    async deleteUser(@CurrentUserId() id: number): Promise<UserResponseDto> {
        await this.userService.deleteUser(id)
        return {
            message: 'Successfully deleted user'
        }
    }
}
