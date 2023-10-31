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
import {UserListResponseDto} from "./dtos/response/userListResponseDto";
import {ApiAcceptedResponse, ApiOperation} from "@nestjs/swagger";
import {CreateUserRequestDto} from "./dtos/request/createUserRequest.dto";
import {UserResponseDto} from "./dtos/response/userResponse.dto";
import {UpdateUserRequestDto} from "./dtos/request/updateUserRequest.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @ApiOperation({
        description: 'Fetch all users'
    })
    @Get()
    async fetchAll(): Promise<UserListResponseDto> {
        try{
            return this.userService.fetchAll();
        }catch (error){
            if(error instanceof NotFoundException){
                throw error;
            }
        }
        throw new NotFoundException({response: 'failed to fetch users'})
    }

    @Get('id/:id')
    @ApiOperation({
        summary: 'Find by id'
    })
    async findUserById(@Param('id') id: number): Promise<UserResponseDto> {
        try {
            return await this.userService.findUserById(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new HttpException({ response: 'Failed to find user' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('create')
    @ApiOperation({
        summary: 'Create user'
    })
    async createUser(@Body() createUserRequestDto: CreateUserRequestDto): Promise<UserResponseDto> {
        try{
            await this.userService.createUser(createUserRequestDto)
            return { message: 'User created successfully' };
        }catch (error) {
            if(error instanceof ConflictException){
                throw error
            }
            throw new ConflictException({response: 'Email already used'})
        }
    }

    @Post('update/:id')
    @ApiOperation({
        summary: 'Update user'
    })
    async updateUser(@Param('id') id: number ,@Body() updateUserRequestDto: UpdateUserRequestDto): Promise<UserResponseDto>{
        try{
            await this.userService.updateUser(updateUserRequestDto,id)
            return {message: 'User updated successfully'}
        }catch (error){
            if(error instanceof NotFoundException)
                throw error
        }
        throw new NotFoundException({response: 'User dose not exist with the provided id'})
    }

    @Delete('delete/:id')
    @ApiOperation({
        summary: 'Delete user'
    })
    async deleteUser(@Param('id') id: number): Promise<UserResponseDto>{
        try {
            await this.userService.deleteUser(id)
            return {
                message: 'Successfully deleted user'
            }
        }catch (error) {
            if(error instanceof NotFoundException){
                throw error
            }
        }
        throw new NotFoundException({response: 'User dose not exist with the provided id'})
    }
}
