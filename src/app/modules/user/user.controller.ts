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

@ApiBearerAuth()
@ApiTags('user')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Fetch all users',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async fetchAll(): Promise<UserResponseDto> {
    const entities: UserEntity[] = await this.userService.fetchAll();
    return {
      message: 'User Found',
      data: entities.map((userEntity) => userEntity.toDto()),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find by id',
  })
  async findUserById(@Param('id') id: number): Promise<UserResponseDto> {
    const entity: UserEntity = await this.userService.findUserById(id);
    return {
      message: 'User Found',
      data: entity.toDto()
    };
  }

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiBody({
    type: UserRequestDto,
  })
  async createUser(@Body() dto: UserRequestDto): Promise<UserResponseDto> {
    const entity: UserEntity = await this.userService.createUser(dto);
    return {
      message: 'User Found',
      data: entity.toDto()
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiBody({
    type: UserRequestDto,
  })
  async updateUser(
    @CurrentUser() currentUser: UserEntity,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const entity: UserEntity = await this.userService.updateUser(
      dto,
      currentUser.id,
    );
    return {
      message: 'User Found',
      data: entity.toDto()
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
  })
  async deleteUser(
    @CurrentUser() currentUser: UserEntity,
  ): Promise<UserResponseDto> {
    await this.userService.deleteUser(currentUser.id);
    return {
      message: 'successfully deleted'
    };
  }
}
