import {
    Body,
    ConflictException,
    Controller, Delete,
    Get,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import {UserService} from "./user.service";
import { ApiOperation} from "@nestjs/swagger";
import {UserResponseDto} from "./dtos/response/userResponse.dto";
import {CreateUserRequestDto} from "./dtos/request/createUserRequest.dto";
import {UpdateUserRequestDto} from "./dtos/request/updateUserRequest.dto";
import {UserEntity} from "../../../shared/modules/user/user.entity";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @ApiOperation({
        description: 'Fetch all users'
    })
    @Get()
    async fetchAll(): Promise<UserResponseDto[]> {
        const entities: UserEntity[] = await this.userService.fetchAll();
        return entities.map(userEntity => userEntity.toDto());
    }

    @Get('id/:id')
    @ApiOperation({
        summary: 'Find by id'
    })
    async findUserById(@Param('id') id: number): Promise<UserResponseDto> {
        const entity: UserEntity = await this.userService.findUserById(id);
        return entity.toDto();
    }

    @Post('create')
    @ApiOperation({
        summary: 'Create user'
    })
    async createUser(@Body() createUserRequestDto: CreateUserRequestDto): Promise<UserResponseDto> {
        const entity: UserEntity = await this.userService.createUser(createUserRequestDto)
        return entity.toDto()
    }

    @Post('update/:id')
    @ApiOperation({
        summary: 'Update user'
    })
    async updateUser(@Param('id') id: number ,@Body() updateUserRequestDto: UpdateUserRequestDto): Promise<UserResponseDto>{
        await this.userService.updateUser(updateUserRequestDto,id)
        return {message: 'User updated successfully'}
    }

    @Delete('delete/:id')
    @ApiOperation({
        summary: 'Delete user'
    })
    async deleteUser(@Param('id') id: number): Promise<UserResponseDto> {
        await this.userService.deleteUser(id)
        return {
            message: 'Successfully deleted user'
        }
    }
}
