import { Controller, Get } from '@nestjs/common';
import { SearchEngineService } from './searchEngine.service';

@Controller('search-engine')
export class SearchEngineController {
  constructor(private readonly searchEngineService: SearchEngineService) {}

  @Get('/search')
  async loginAdmin() {
    return this.searchEngineService.search();
  }
}
