import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsEmail, IsNotEmpty, IsEnum} from 'class-validator';
import {UserRolesEnum} from "../../../auth/enums/user-roles.enum";

export class UserRequestDto {
  @ApiProperty({ description: 'first name', required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'last Name', required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Username', required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'first name', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'email', required: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({description: 'user role', required: true})
  @IsNotEmpty()
  @IsEnum(UserRolesEnum, {message: 'role must be a validate UserRolesEnum value'})
  role: UserRolesEnum
}
