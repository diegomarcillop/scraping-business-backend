import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rol } from '../entities/user/rol.entity';
import { User } from '../entities/user/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Rol], 'user')],
  providers: [],
  exports: [],
})
export class CommonModule {}
