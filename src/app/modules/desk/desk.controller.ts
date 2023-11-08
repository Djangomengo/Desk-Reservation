import {Controller, Get, Post} from '@nestjs/common';
import {DeskService} from "./desk.service";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {DeskResponseDto} from "./dtos/response/deskResponse.dto";
import {DeskEntity} from "../../shared/modules/desk/desk.entity";
import {Public} from "../../shared/decorators/is-public.decorator";

@ApiTags('Desk')
@Controller('desks')
export class DeskController {
    constructor(
        private readonly deskService: DeskService
    ) {}

    @ApiOperation({
        summary: 'create a table'
    })
    @ApiBearerAuth()
    @Post('create')
    async createDesk(): Promise<DeskResponseDto> {
        await this.deskService.createDesk()
        return {
            message: 'desk created'
        }
    }

    @ApiOperation({
        summary: 'fetch all desks'
    })
    @Public()
    //@ApiBearerAuth()
    @Get()
    async fetchAll(): Promise<DeskResponseDto[]> {
        const desks: DeskEntity[] = await this.deskService.fetchAll()
        return desks.map(deskEntity => deskEntity.toDto())
    }
}
