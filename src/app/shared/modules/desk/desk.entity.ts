import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {DeskResponseDto} from "../../../modules/desk/dtos/response/deskResponse.dto";
import {plainToClass} from "class-transformer";

@Entity('desk')
export class DeskEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({default: false})
    taken: boolean

    toDto():DeskResponseDto{
        return plainToClass(DeskResponseDto, this, {
            excludeExtraneousValues: true
        })
}
}