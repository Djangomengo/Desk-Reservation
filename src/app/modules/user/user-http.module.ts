import { Module } from '@nestjs/common';
import { UserModule } from 'src/app/shared/modules/user/user.module';
import { UserController } from 'src/app/modules/user/user.controller';
import { UserService } from 'src/app/modules/user/user.service';
import {AdminController} from "../admin/admin.controller";
import {AdminService} from "../admin/admin.service";

@Module({
  imports: [UserModule],
  controllers: [UserController, AdminController],
  providers: [UserService, AdminService],
  exports: [UserService],
})
export class UserHttpModule {}
