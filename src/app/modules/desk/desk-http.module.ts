import { Module } from '@nestjs/common';
import {DeskTypeormModule} from "./desk-typeorm.module";
import {DeskController} from "./desk.controller";
import {DeskService} from "./desk.service";

@Module({
    imports: [DeskTypeormModule],
    controllers: [DeskController],
    providers: [DeskService],
    exports: [DeskService]
})
export class DeskHttpModule {}
