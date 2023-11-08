import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {WeekEnum} from "../../enums/week.enum";
import {UserEntity} from "../user/user.entity";
import {DeskEntity} from "../desk/desk.entity";

@Entity()
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        enum: WeekEnum,
    })
    day: WeekEnum

    @ManyToOne(type => UserEntity, user => user.id)
    userID: number

    @ManyToOne(type => DeskEntity, desk => desk.id)
    deskId: number

}

