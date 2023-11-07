import { Module } from '@nestjs/common';
import {PasswordService} from "../password/password.service";
import {PasswordModule} from "../password/password.module";
import {UserService} from "../user/user/user.service";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UserTypeormModule} from "../user/user/user-typeorm.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "../../shared/guards/jwt-auth.guard";

@Module({
    imports: [
        PasswordModule, UserTypeormModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '600s' },
        }),
    ],
    controllers: [AuthController],
    providers:[
        PasswordService,
        UserService,
        AuthService,
        {
        provide: APP_GUARD,
        useClass: JwtAuthGuard
        },
    ],
})
export class AuthHttpModule {}
