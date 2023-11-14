import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dtos/response/userResponse.dto';
import { UserRequestDto } from './dtos/request/user-request.dto';
import { UpdateUserRequestDto } from './dtos/request/update-user-request.dto';
import { UserEntity } from '../../shared/modules/user/user.entity';
import { Public } from '../../shared/decorators/is-public.decorator';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Fetch all users',
  })
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async fetchAll(): Promise<UserResponseDto[]> {
    const entities: UserEntity[] = await this.userService.fetchAll();
    return entities.map((userEntity) => userEntity.toDto());
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find by id',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findUserById(
      @Param('id') id: number
  ): Promise<UserResponseDto> {
    const entity: UserEntity = await this.userService.findUserById(id);
    return entity.toDto();
  }

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiBody({ type: UserRequestDto })
  async createUser(
    @Body() dto: UserRequestDto,
  ): Promise<UserResponseDto> {
    const entity: UserEntity =
      await this.userService.createUser(dto);
    return entity.toDto();
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiBody({type: UserRequestDto})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @CurrentUser() currentUser: UserEntity,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const entity: UserEntity = await this.userService.updateUser(
      dto,
      currentUser.id,
    );
    return entity.toDto();
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @CurrentUser() currentUser: UserEntity,
  ): Promise<string> {
    await this.userService.deleteUser(currentUser.id);
    return 'successfully deleted'
  }
}
