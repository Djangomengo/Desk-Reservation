import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "src/app/shared/modules/user/user.entity";
import {UserRepository} from "src/app/shared/modules/user/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [UserRepository],
    exports: [UserRepository]
})
export class UserModule {
}
