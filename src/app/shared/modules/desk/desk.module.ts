import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DeskEntity} from "./desk.entity";
import {DeskRepository} from "./desk.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([DeskEntity])
    ],
    providers: [DeskRepository],
    exports: [DeskRepository]
})
export class DeskModule {
}
