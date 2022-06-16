import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './@common/common.module';
import { AuthModule } from './modules/auth/auth.module';

import appConfig from './@common/config/app.config';
import typeormConfig from './@common/config/typeorm.config';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm.user'),
      name: 'user',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm.search'),
      name: 'search',
    }),

    CacheModule.register({
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('cache.ttl'),
        max: configService.get('cache.max'),
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    AuthModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
