import { Module } from '@nestjs/common';
import {UserTypeOrmModule} from "./user-TypeOrm.module";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";

@Module({
    imports: [UserTypeOrmModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserHttpModule {}
