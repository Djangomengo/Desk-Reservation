import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('desk')
export class DeskEntity {
    @PrimaryGeneratedColumn()
    id: number
}