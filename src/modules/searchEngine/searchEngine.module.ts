import { Module } from '@nestjs/common';

import { SearchEngineController } from './searchEngine.controller';
import { SearchEngineService } from './searchEngine.service';

@Module({
  imports: [],
  controllers: [SearchEngineController],
  providers: [SearchEngineService],
})
export class SearchEngineModule {}
