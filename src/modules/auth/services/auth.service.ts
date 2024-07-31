import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { UserService } from '../../user/services/user.service';
import { UserEntity } from '../../user/entities/user.entity';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user: UserEntity = await this.usersService.getUserByUsername(
      signInDto.username,
    );
    if (!(await compare(signInDto.password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
