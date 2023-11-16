import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserResponseDto } from '../../../modules/user/dtos/response/userResponse.dto';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import {ReservationEntity} from "../reservation/reservation.entity";

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

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user, {
  })
  reservation: ReservationEntity[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toDto(): UserResponseDto {
    return plainToClass(UserResponseDto, this, {
      excludeExtraneousValues: true,
    });
  }
}
