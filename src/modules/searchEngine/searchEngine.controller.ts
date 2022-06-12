import { Body, Controller, Get } from '@nestjs/common';
import {
  ResponseError,
  ResponseSuccess,
} from 'src/@common/interfaces/response';

import { SearchDTO } from './dto/search.dto';
import { SearchEngineService } from './searchEngine.service';
import { getPublicationsGoogle } from './transforms/getPublicationsGoogle.transform';

@Controller('search-engine')
export class SearchEngineController {
  constructor(private readonly searchEngineService: SearchEngineService) {}

  @Get('/search')
  async loginAdmin(
    @Body() body: SearchDTO,
  ): Promise<ResponseSuccess | ResponseError> {
    /*let publications = getPublicationsGoogle(
      await this.searchEngineService.searchGoogleAcademy(body),
    );

    publications = publications.filter((item) => item?.type?.name !== 'CITAS');
    const publications = await this.searchEngineService.searchRedalyc(body);
    const publications = await this.searchEngineService.searchScielo(body);
    */
    let publications = getPublicationsGoogle(
      await this.searchEngineService.searchGoogleAcademy(body),
    );

    publications = publications.filter((item) => item?.type?.name !== 'CITAS');

    return {
      success: 'OK',
      payload: {
        length: publications.length,
        publications,
      },
    };
  }
}
