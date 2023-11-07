import { Module } from '@nestjs/common';
import {UserTypeormModule} from "./user-typeorm.module";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PasswordModule} from "../../password/password.module";
import {PasswordService} from "../../password/password.service";

@Module({
    imports: [UserTypeormModule, PasswordModule],
    controllers: [UserController],
    providers: [UserService, PasswordService],
    exports: [UserService]
})
export class UserHttpModule {}
