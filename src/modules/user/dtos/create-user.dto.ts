import {
  IsEmail,
  IsString,
  IsISO8601,
  IsNotEmpty,
  IsEnum,
  MinLength,
} from 'class-validator';
import { GenderEnum } from '../constants/gender.enum';
import { UserEntity } from '../entities/user.entity';
import { Unique } from '@common/decorators/unique.decorator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsISO8601()
  birthDate: Date;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Unique(UserEntity)
  @IsNotEmpty()
  username: string;
}
