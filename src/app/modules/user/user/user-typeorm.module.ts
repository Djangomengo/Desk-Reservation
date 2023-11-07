import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../../../shared/modules/user/user.entity";
import {UserRepository} from "../../../shared/modules/user/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity,UserRepository])
    ],
    providers: [UserRepository],
    exports: [UserRepository]
})
export class UserTypeormModule {}
