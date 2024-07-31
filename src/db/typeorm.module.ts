import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/entities/*.entity.js'],
      synchronize: true,
      // migrations: [ 'dist/db/migrations/**/*.js' ],
      // cli: { migrationsDir: 'src/db/migrations' },
    }),
  ],
})
export class TypeOrmModule {}
