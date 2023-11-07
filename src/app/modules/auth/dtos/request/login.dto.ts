import {ApiProperty} from "@nestjs/swagger";

export class LoginRequestDto {
    @ApiProperty({description: 'email', required: true})
    email: string;

    @ApiProperty({description: 'password', required: true})
    password: string;
}