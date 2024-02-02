import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DeskResponseDto} from "../../../modules/desk/dtos/response/deskResponse.dto";
import {plainToClass} from "class-transformer";
import {ReservationEntity} from "../reservation/reservation.entity";

@Entity('desk')
export class DeskEntity {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => ReservationEntity, reservation => reservation.desk)
    reservations: ReservationEntity[];

    toDto():DeskResponseDto{
        return plainToClass(DeskResponseDto, this, {
            excludeExtraneousValues: true
        })
}
}