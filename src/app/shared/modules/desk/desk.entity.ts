import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DeskResponseDto} from "../../../modules/desk/dtos/response/deskResponse.dto";
import {plainToClass} from "class-transformer";
import {BookingEntity} from "../booking/booking.entity";

@Entity('desk')
export class DeskEntity {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => BookingEntity, booking => booking.desk)
    bookings: BookingEntity[];

    toDto():DeskResponseDto{
        return plainToClass(DeskResponseDto, this, {
            excludeExtraneousValues: true
        })
}
}