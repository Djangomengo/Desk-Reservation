import {Body, Controller, Delete, Param, Post, UseGuards} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody, ApiConflictResponse,
  ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { reservationRequestDto } from './dtos/request/reservation-request.dto';
import { ReservationResponseDto } from './dtos/response/reservationResponse.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { UserEntity } from '../../shared/modules/user/user.entity';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags(`reservation`)
@Controller('reservations')
export class ReservationController {
  constructor(private readonly bookingService: ReservationService) {}

  @Post()
  @ApiOperation({
    summary: `create a reservation`,
  })
  @ApiBody({
    type: reservationRequestDto
  })
  @ApiBadRequestResponse({
    description: 'check your inputs'
  })
  @ApiCreatedResponse({
    description: 'reservation successfully created.'
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error'
  })
  @ApiConflictResponse({
    description: 'reservation already in use'
  })
  async createReservation(@CurrentUser() currentUser: UserEntity, @Body() dto: reservationRequestDto): Promise<ReservationResponseDto> {
    await this.bookingService.createReservation(
      currentUser.id,
      dto.deskId,
      dto.day,
    );
    return {
      message: `booking Created`
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: `Delete a reservation`,
  })
  @ApiOkResponse({
    description: 'reservation successfully deleted.'
  })
  @ApiNotFoundResponse({
    description: 'reservation not found'
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID'
  })
  async deleteReservation(@Param('id') id: number): Promise<void> {
    await this.bookingService.deleteReservation(id);
  }
}
