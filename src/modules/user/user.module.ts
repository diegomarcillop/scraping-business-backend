import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/user/person.entity';
import { User } from 'src/entities/user/user.entity';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Person], 'user')],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
