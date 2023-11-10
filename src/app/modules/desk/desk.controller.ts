import {Controller, Get, Post, UseGuards} from '@nestjs/common';
import {DeskService} from "./desk.service";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {DeskResponseDto} from "./dtos/response/deskResponse.dto";
import {DeskEntity} from "../../shared/modules/desk/desk.entity";
import {Public} from "../../shared/decorators/is-public.decorator";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";

@ApiTags('Desk')
@Controller('desks')
export class DeskController {
    constructor(
        private readonly deskService: DeskService
    ) {}

    @Post('create')
    @ApiOperation({
        summary: 'create a table'
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async createDesk(): Promise<DeskResponseDto> {
        await this.deskService.createDesk()
        return {
            message: 'desk created'
        }
    }

    @Get('desks')
    @ApiOperation({
        summary: 'fetch all free desks'
    })
    @Public()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async fetchFreeDesks(): Promise<DeskResponseDto[]> {
        const desks: DeskEntity[] = await this.deskService.fetchFreeDesks()
        return desks.map(deskEntity => deskEntity.toDto())
    }
}
