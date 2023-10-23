import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {WeekEnum} from "../../enums/week.enum";

@Entity()
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        enum: WeekEnum,
    })
    day: WeekEnum
}

