import { Module } from '@nestjs/common';
import { UserModule } from 'src/app/shared/modules/user/user.module';
import { UserController } from 'src/app/modules/user/user.controller';
import { UserService } from 'src/app/modules/user/user.service';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserHttpModule {}
