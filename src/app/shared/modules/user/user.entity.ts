import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {UserResponseDto} from "../../../modules/user/user/dtos/response/userResponse.dto";
import {plainToClass} from "class-transformer";
import {BookingEntity} from "../booking/booking.entity";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @OneToMany(() => BookingEntity, booking => booking.user)
    bookings: BookingEntity[];



    toDto(): UserResponseDto{
        return plainToClass(UserResponseDto,this, {
            excludeExtraneousValues: true
        });
    }
}
