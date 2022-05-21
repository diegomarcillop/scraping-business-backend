import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtStrategy } from '../../@common/strategys/jwt.strategy';
import { AuthController } from './auth.controller';
import { User } from '../../entities/user/user.entity';
import { Person } from '../../entities/user/person.entity';
import { Rol } from '../../entities/user/rol.entity';
import { LoginService } from './services/login.service';
import { TokenService } from './services/token.service';
import { SignUpService } from './services/signup.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Person, Rol], 'user'),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_KEY'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRE') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, LoginService, TokenService, SignUpService],
})
export class AuthModule {}
