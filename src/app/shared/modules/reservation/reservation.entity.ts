import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {WeekEnum} from "../../enums/week.enum";
import {UserEntity} from "../user/user.entity";
import {DeskEntity} from "../desk/desk.entity";

@Entity('reservation')
@Unique(['userId', "day"])
@Unique(['deskId', "day"])
export class ReservationEntity {
    @PrimaryGeneratedColumn()
    id: number

    // @Column({
    //     type: "varchar",
    //     enum: WeekEnum,
    // })
    // day: WeekEnum;

    @Column({type: "date"})
    day: Date;

    @Column()
    userId: number;

    @Column()
    deskId: number;

    @ManyToOne(() => UserEntity, user => user.reservation,{onDelete: 'CASCADE'})
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @ManyToOne(() => DeskEntity, desk => desk.reservations,{onDelete: 'CASCADE'})
    @JoinColumn({ name: "deskId" })
    desk: DeskEntity;

}

