import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {WeekEnum} from "../../enums/week.enum";
import {UserEntity} from "../user/user.entity";
import {DeskEntity} from "../desk/desk.entity";

@Entity('booking')
@Unique(['userId', "day"])
@Unique(['deskId', "day"])
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        enum: WeekEnum,
    })
    day: WeekEnum;

    @Column()
    userId: number;

    @Column()
    deskId: number;

    @ManyToOne(() => UserEntity, user => user.bookings)
    @JoinColumn({ name: "userId" }) // Specify the FK column
    user: UserEntity;

    @ManyToOne(() => DeskEntity, desk => desk.bookings)
    @JoinColumn({ name: "deskId" }) // Specify the FK column
    desk: DeskEntity;

}

