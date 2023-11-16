import { ApiProperty } from '@nestjs/swagger';
import {IsDateString, IsNotEmpty} from 'class-validator';

export class reservationRequestDto {
  @ApiProperty({
    description: 'date in YYYY-MM-DD format',
    required: true,
    format: 'date',
  })
  @IsDateString()
  @IsNotEmpty()
  day: string; // YYYY-MM-DD

  @ApiProperty({ description: 'desk', required: true })
  @IsNotEmpty()
  deskId: number;
}
