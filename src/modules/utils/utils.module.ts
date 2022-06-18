import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/user/category.entity';

import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category], 'user')],
  controllers: [UtilsController],
  providers: [UtilsService],
})
export class UtilsModule {}
