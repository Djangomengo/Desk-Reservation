import {WeekEnum} from "../../../../shared/enums/week.enum";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateBookingRequestDto {
    @ApiProperty({enum: WeekEnum, description: 'day', required: true})
    @IsString()
    @IsNotEmpty()
    day: WeekEnum;

    @ApiProperty({description: 'desk', required: true})
    @IsNotEmpty()
    deskId: number

    @IsNotEmpty()
    userId: number
}