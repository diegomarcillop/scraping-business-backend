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
import { UserModule } from './modules/user/user.module';
import { UtilsModule } from './modules/utils/utils.module';
import { MailModule } from './modules/mail/mail.module';

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
        configService.get('typeorm'),
      name: 'search',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
      name: 'user',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
      name: 'business',
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
    UserModule,
    UtilsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
