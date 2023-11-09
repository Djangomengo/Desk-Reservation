import {Body, Controller, Post,} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {BookingService} from "./booking.service";
import {CreateBookingRequestDto} from "./dtos/request/createBooking.dto";
import {BookingResponseDto} from "./dtos/response/bookingResponse.dto";
import {CurrentUser} from "../../shared/decorators/current-user.decorator";
import {UserEntity} from "../../shared/modules/user/user.entity";

@ApiTags(`booking`)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(`creat`)
  @ApiOperation({
    summary: `create a booking`,
  })
  @ApiBody({ type: CreateBookingRequestDto })
  async createBooking(@CurrentUser() currentUser: UserEntity, @Body() createBookingRequestDto: CreateBookingRequestDto): Promise<BookingResponseDto> {
      console.log(`User Id: ${currentUser.id}`)
      createBookingRequestDto.userId = currentUser.id
      await this.bookingService.createBooking(createBookingRequestDto)
      return {
          message: `booking Created`
      }
  }
}
