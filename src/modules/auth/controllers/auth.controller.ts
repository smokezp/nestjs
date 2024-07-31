import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { AuthService } from '../services/auth.service';
import { Public } from '@common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
