import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserResponseDto } from '../../../modules/user/dtos/response/userResponse.dto';
import { plainToClass } from 'class-transformer';
import { BookingEntity } from '../booking/booking.entity';
import * as bcrypt from 'bcrypt';

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

  @OneToMany(() => BookingEntity, (booking) => booking.user)
  bookings: BookingEntity[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toDto(): UserResponseDto {
    return plainToClass(UserResponseDto, this, {
      excludeExtraneousValues: true,
    });
  }
}
