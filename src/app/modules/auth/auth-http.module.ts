import { Module } from '@nestjs/common';
import {PasswordService} from "../password/password.service";

@Module({
    imports: [PasswordService]
})
export class AuthHttpModule {}
