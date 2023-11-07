import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DeskEntity} from "../../shared/modules/desk/desk.entity";
import {DeskRepository} from "../../shared/modules/desk/desk.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([DeskEntity, DeskRepository])
    ],
    providers: [DeskRepository],
    exports: [DeskRepository]
})
export class DeskTypeormModule {}
