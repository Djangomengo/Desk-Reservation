import {Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import { DeskService } from './desk.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeskResponseDto } from './dtos/response/deskResponse.dto';
import { DeskEntity } from '../../shared/modules/desk/desk.entity';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import {WeekEnum} from "../../shared/enums/week.enum";

@ApiBearerAuth()
@ApiTags('Desk')
@Controller('desks')
@UseGuards(JwtAuthGuard)
export class DeskController {
  constructor(private readonly deskService: DeskService) {}

  @Post('')
  @ApiOperation({ summary: 'create a table' })
  async createDesk(): Promise<DeskResponseDto> {
    await this.deskService.createDesk();
    return {
      message: 'Desk created'
    };
  }

  @Get()
  @ApiOperation({ summary: 'fetch all free desks', })
  async fetchFreeDesks(@Query('day') day: WeekEnum): Promise<DeskResponseDto> {
    const desks: DeskEntity[] = await this.deskService.fetchFreeDesks(day);
    return {
      message: 'Free desks found',
      data: desks.map((deskEntity: DeskEntity) => deskEntity.toDto())
    };
  }
}
