import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from './db/typeorm.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UniqueValidatorConstraint } from '@common/validator-constraint/unique.validator-constraint';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    UniqueValidatorConstraint,
  ],
})
export class AppModule {}
