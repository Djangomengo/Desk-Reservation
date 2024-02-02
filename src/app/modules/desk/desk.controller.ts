import {Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import { DeskService } from './desk.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { DeskResponseDto } from './dtos/response/deskResponse.dto';
import { DeskEntity } from '../../shared/modules/desk/desk.entity';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import {UserResponseDto} from "../user/dtos/response/userResponse.dto";

@ApiBearerAuth()
@ApiTags('Desk')
@Controller('desks')
@UseGuards(JwtAuthGuard)
export class DeskController {
  constructor(private readonly deskService: DeskService) {}

  @Post('')
  @ApiOperation({ summary: 'create a table' })
  @ApiCreatedResponse({
    description: 'desk successfully created.'
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error'
  })
  @ApiUnauthorizedResponse({
    description: 'unauthorized access'
  })
  async createDesk(): Promise<DeskResponseDto> {
    await this.deskService.createDesk();
    return {
      message: 'Desk created'
    };
  }

  @Get()
  @ApiOperation({ summary: 'fetch all free desks', })
  @ApiOkResponse({
    description: 'successfully fetched all desks',
    type: UserResponseDto,
    isArray: true
  })
  @ApiNotFoundResponse({
    description: 'no desks found'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.'
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error'
  })
  @ApiNoContentResponse({
    description: 'no desks to fetch'
  })
  async fetchFreeDesks(@Query('day') day: string): Promise<DeskResponseDto> {
    const desks: DeskEntity[] = await this.deskService.fetchFreeDesks(day);
    return {
      message: 'Free desks found',
      data: desks.map((deskEntity: DeskEntity) => deskEntity.toDto())
    };
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'desk successfully deleted'
  })
  @ApiNoContentResponse({ description: 'desk successfully deleted.' })
  @ApiOperation({
    summary: 'Delete desk',
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error'
  })
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.deskService.deleteDesk(id)
  }
}

