import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {WeekEnum} from "../../enums/week.enum";
import {JoinTable} from "typeorm/browser";
import {UserEntity} from "../user/user.entity";
import {DeskEntity} from "../desk/desk.entity";
import {DeskResponseDto} from "../../../modules/desk/dtos/response/deskResponse.dto";

@Entity()
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        enum: WeekEnum,
    })
    day: WeekEnum

    @OneToMany(type => UserEntity, user => user.id)
    userID: number

    @OneToMany(type => DeskEntity, desk => desk.id)
    deskId: number

}

