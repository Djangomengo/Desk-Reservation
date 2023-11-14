import {Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import { DeskService } from './desk.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeskResponseDto } from './dtos/response/deskResponse.dto';
import { DeskEntity } from '../../shared/modules/desk/desk.entity';
import { Public } from '../../shared/decorators/is-public.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import {WeekEnum} from "../../shared/enums/week.enum";

@ApiTags('Desk')
@Controller('desks')
export class DeskController {
  constructor(private readonly deskService: DeskService) {}

  @Post('')
  @ApiOperation({ summary: 'create a table' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createDesk(): Promise<string> {
    await this.deskService.createDesk();
    return 'desk created' }

  @Get()
  @ApiOperation({ summary: 'fetch all free desks', })
  @Public()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async fetchFreeDesks(@Query('day') day: WeekEnum): Promise<DeskResponseDto[]> {
    const desks: DeskEntity[] = await this.deskService.fetchFreeDesks(day);
    return desks.map((deskEntity: DeskEntity) => deskEntity.toDto());
  }
}
