import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../user/user.entity";

@Entity()
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne (() => user => UserEntity)
    @JoinColumn ()
    user: UserEntity;

    @Column ({type: 'text', nullable: true})
    refreshToken: string;

    @Column({type: 'timestamp', nullable: true})
    refreshTokenExpiresAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastLogin: Date;

    @CreateDateColumn()
    createtAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}