import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    username: string

    @Column()
    email: string
}
