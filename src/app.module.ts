import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './@common/common.module';

import appConfig from './@common/config/app.config';
import typeormConfig from './@common/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm.user'),
      name: 'user',
    }),
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
