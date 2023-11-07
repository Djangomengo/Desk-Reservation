import { Module } from '@nestjs/common';
import {UserTypeormModule} from "./user-typeorm.module";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PasswordModule} from "../../password/password.module";
import {PasswordService} from "../../password/password.service";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "../../../shared/guards/jwt-auth.guard";

@Module({
    imports: [UserTypeormModule, PasswordModule],
    controllers: [UserController],
    providers: [UserService, PasswordService,/*
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
        */
    ],
    exports: [UserService]
})
export class UserHttpModule {}
