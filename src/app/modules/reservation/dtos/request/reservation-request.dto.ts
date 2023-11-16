import { WeekEnum } from 'src/app/shared/enums/week.enum';
import { ApiProperty } from '@nestjs/swagger';
import {IsEnum, IsNotEmpty, IsString} from 'class-validator';

export class reservationRequestDto {
  @ApiProperty({ enum: WeekEnum, description: 'day', required: true })
  @IsString()
  @IsEnum(WeekEnum)
  @IsNotEmpty()
  day: WeekEnum;

  @ApiProperty({ description: 'desk', required: true })
  @IsNotEmpty()
  deskId: number;
}
