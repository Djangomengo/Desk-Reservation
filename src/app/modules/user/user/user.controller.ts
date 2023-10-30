import {Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Res} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserListResponseDto} from "./dtos/response/userListResponseDto";
import {ApiBody, ApiOkResponse} from "@nestjs/swagger";
import {CreateUserRequestDto} from "./dtos/request/createUser.dto";
import {UserResponseDto} from "./dtos/response/userResponse.dto";
import {response} from "express";
import {UserFetchRequestDto} from "./dtos/request/fetchUser.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    @ApiOkResponse({description: 'Successfully Fetched'})
    async fatchAll(): Promise<UserListResponseDto> {
        return this.userService.fatchAll();
    }

    @ApiOkResponse({description: 'Successfully Fetched'})
    @Get('id/:id')
    async fetchUserByID(@Param('id') id: number): Promise<UserResponseDto> {
        return await this.userService.fetchUserById(id)
            .catch(error => {
                if (error.message === 'User not found') {
                    throw new HttpException({ response: 'User not found'}, HttpStatus.NOT_FOUND );
                } else {
                    throw new HttpException({ response: 'Failed to find user'}, HttpStatus.INTERNAL_SERVER_ERROR );
                }
            });
    }//????


    #userControler
    @Post()
    @ApiOkResponse({description: 'User created successfully',})  //<------ wäre hier type: CreateUserRequestDto ok ?
    async createUser(@Body() createUserRequestDto: CreateUserRequestDto): Promise<UserResponseDto> {
        return await this.userService.createUser(createUserRequestDto)
            .catch(error => {
                throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR)
            });
    }
}
