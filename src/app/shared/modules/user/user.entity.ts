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
import {UserRolesEnum} from "../../../modules/auth/enums/user-roles.enum";

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

  @Column({
    type: 'enum',
    enum: UserRolesEnum,
    default: UserRolesEnum.USER
  })
  role: UserRolesEnum

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toDto(): UserResponseDto {
    return plainToClass(UserResponseDto, this, {
      excludeExtraneousValues: true,
    });
  }
}
