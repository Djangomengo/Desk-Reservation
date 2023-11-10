import { Module } from '@nestjs/common';
import { UserTypeormModule } from 'src/app/modules/user/user-typeorm.module';
import { UserController } from 'src/app/modules/user/user.controller';
import { UserService } from 'src/app/modules/user/user.service';

@Module({
  imports: [UserTypeormModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserHttpModule {}
