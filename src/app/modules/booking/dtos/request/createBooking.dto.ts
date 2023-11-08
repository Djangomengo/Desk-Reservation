import {WeekEnum} from "../../../../shared/enums/week.enum";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateBookingRequestDto {
    @ApiProperty({description: 'day', required: true})
    @IsString()
    @IsNotEmpty()
    day: WeekEnum;


    //Eventuel @String noetig falls der request ein string witer gibt
    @ApiProperty({description: 'desk', required: true})
    @IsNotEmpty()
    deskId: number

    @IsNotEmpty()
    userId: number
}