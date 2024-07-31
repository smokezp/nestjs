import {
  Column,
  Entity,
} from 'typeorm';
import { GenderEnum } from '../constants/gender.enum';
import { Exclude } from 'class-transformer';
import { AbstractEntity } from '@common/entities/abstract.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'username', type: 'varchar', unique: true })
  username: string;

  @Exclude()
  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'birth_date', type: 'timestamp', nullable: true })
  birthDate: Date;

  @Column({ name: 'gender', type: 'enum', enum: GenderEnum, nullable: true })
  gender: GenderEnum | null;
}
