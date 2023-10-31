import {ApiProperty} from "@nestjs/swagger";

export class UserFetchRequestDto {
    @ApiProperty({description: 'User ID', required: true})
    userId: number;
}