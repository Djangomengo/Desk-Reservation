import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingRequestDto } from './dtos/request/createBooking.dto';
import { BookingResponseDto } from './dtos/response/bookingResponse.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { UserEntity } from '../../shared/modules/user/user.entity';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { SetDeskAsTakenDto } from '../desk/dtos/request/set-desk-as-taken.dto';

@ApiTags(`booking`)
@Controller('bookings')
export class BookingController {
  private logger = new Logger(BookingService.name);

  constructor(private readonly bookingService: BookingService) {}

  @Post(`creat`)
  @ApiOperation({
    summary: `create a booking`,
  })
  @ApiBody({ type: CreateBookingRequestDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createBooking(
    @CurrentUser() currentUser: UserEntity,
    @Body() dto: CreateBookingRequestDto,
  ): Promise<BookingResponseDto> {
    await this.bookingService.createBooking(
      currentUser.id,
      dto.deskId,
      dto.day,
    );
    return {
      message: `booking Created`,
    };
  }
}
