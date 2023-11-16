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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
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

  @Get()
  @ApiOperation({
    summary: 'Fetch all users',
  })
  @ApiOkResponse({
    description: 'successfully fetched all user',
    type: UserResponseDto,
    isArray: true
  })
  @ApiNotFoundResponse({
    description: 'no users found'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.'
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error'
  })
  @ApiNoContentResponse({
    description: 'no users to fetch'
  })
  async fetchAll(): Promise<UserResponseDto> {
    const entities: UserEntity[] = await this.userService.fetchAll();
    return {
      message: 'User Found',
      data: entities.map((userEntity: UserEntity) => userEntity.toDto()),
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find by id',
  })
  @ApiNotFoundResponse({
    description: 'no users found'
  })
  @ApiNoContentResponse({
    description: 'no users to fetch'
  })
  @ApiOkResponse({
    description: 'User successfully fetched.'
  })
  @ApiBadRequestResponse({
    description: 'check your inputs '
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.'
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error'
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
  @ApiBody({
    type: UserRequestDto,
  })
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiBadRequestResponse({
    description: 'check your inputs'
      })
  @ApiCreatedResponse({
    description: 'User successfully created.'
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error'
  })
  @ApiConflictResponse({
    description: 'email or username already in use'
  })
  async createUser(@Body() dto: UserRequestDto): Promise<UserResponseDto> {
    const entity: UserEntity = await this.userService.createUser(dto);
    return {
      message: 'User created',
      data: entity.toDto()
    };
  }

  @Put(':id')
  @ApiBody({
    type: UserRequestDto,
  })
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiOkResponse({
    description: 'user successfully updated'
  })
  @ApiBadRequestResponse({
    description: 'check your inputs '
  })
  @ApiUnauthorizedResponse({
    description: 'unauthorized access'
  })
  @ApiConflictResponse({
    description: 'email or password already in use'
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error'
  })
  async updateUser(@CurrentUser() currentUser: UserEntity,@Body() dto: UpdateUserRequestDto): Promise<UserResponseDto> {
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
  @ApiOkResponse({
    description: 'user successfully deleted'
  })
  @ApiNoContentResponse({ description: 'User successfully deleted.' })
  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error'
  })
  async deleteUser(@CurrentUser() currentUser: UserEntity): Promise<void> {
    await this.userService.deleteUser(currentUser.id);
  }
}
