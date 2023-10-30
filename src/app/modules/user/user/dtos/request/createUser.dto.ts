import {ApiProperty} from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import {Column} from "typeorm";

export class CreateUserRequestDto {

    @ApiProperty({description: 'first name', required: true})
    @IsString()
    @IsNotEmpty()
    firstName: string

    @ApiProperty({description: 'last Name', required: true})
    @IsString()
    @IsNotEmpty()
    lastName: string

    @ApiProperty({description: 'Username', required: true})
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({description: 'password', required: true})
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({description: 'email', required: true})
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

