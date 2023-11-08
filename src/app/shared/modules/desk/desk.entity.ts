import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DeskResponseDto} from "../../../modules/desk/dtos/response/deskResponse.dto";
import {plainToClass} from "class-transformer";

@Entity('desk')
export class DeskEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({default: false})
    taken: boolean

    @OneToMany(
        type => DeskEntity,
        (desk: DeskEntity) => desk.id
    )
    deskId: number

    toDto():DeskResponseDto{
        return plainToClass(DeskResponseDto, this, {
            excludeExtraneousValues: true
        })
}
}