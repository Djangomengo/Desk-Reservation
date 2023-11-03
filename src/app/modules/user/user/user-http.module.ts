import { Module } from '@nestjs/common';
import {UserTypeormModule} from "./user-typeorm.module";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";

@Module({
    imports: [UserTypeormModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserHttpModule {}
