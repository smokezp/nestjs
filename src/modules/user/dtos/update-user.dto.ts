import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { GenderEnum } from '../constants/gender.enum';
import { UserEntity } from '../entities/user.entity';
import { Unique } from '@common/decorators/unique.decorator';

export class UpdateUserDto {
  @IsNotEmpty()
  id: number;

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

  @Unique(UserEntity)
  @IsNotEmpty()
  username: string;
}
