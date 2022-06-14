import { Body, Controller, Post } from '@nestjs/common';
import {
  ResponseError,
  ResponseSuccess,
} from 'src/@common/interfaces/response';

import { SearchDTO } from './dto/search.dto';
import { SearchEngineService } from './searchEngine.service';
import { getPublicationsGoogle } from './transforms/getPublicationsGoogle.transform';
import { getPublicationsScielo } from './transforms/getPublicationsScielo.transform';

@Controller('search-engine')
export class SearchEngineController {
  constructor(private readonly searchEngineService: SearchEngineService) {}

  @Post('/search')
  async search(
    @Body() body: SearchDTO,
  ): Promise<ResponseSuccess | ResponseError> {
    /*let publications = getPublicationsGoogle(
      await this.searchEngineService.searchGoogleAcademy(body),
    );

    publications = publications.filter((item) => item?.type?.name !== 'CITAS');
    const publications = await this.searchEngineService.searchRedalyc(body);
    const publications = await this.searchEngineService.searchScielo(body);
    */
    let publications = [];

    publications = getPublicationsGoogle(
      await this.searchEngineService.searchGoogleAcademy(body),
    ).filter((item) => item?.type?.name !== 'CITAS');

    publications = publications.concat(
      getPublicationsScielo(await this.searchEngineService.searchScielo(body)),
    );

    if (body.year)
      publications = publications.filter((item) => item.year === body.year);

    return {
      success: 'OK',
      payload: {
        length: publications.length,
        publications,
      },
    };
  }
}
