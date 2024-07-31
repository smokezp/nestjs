import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constants/jwt.constant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      //1 day
      signOptions: { expiresIn: jwtConstant.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
