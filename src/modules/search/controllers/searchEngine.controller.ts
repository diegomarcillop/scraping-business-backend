import { Body, Controller, Post } from '@nestjs/common';
import {
  ResponseError,
  ResponseSuccess,
} from 'src/@common/interfaces/response';

import { SearchDTO } from '../dto/search.dto';
import { FilterService } from '../services/filter.service';
import { SearchEngineService } from '../services/searchEngine.service';
import { getPublicationsGoogle } from '../transforms/getPublicationsGoogle.transform';
import { getPublicationsScielo } from '../transforms/getPublicationsScielo.transform';

@Controller('search')
export class SearchEngineController {
  constructor(
    private readonly searchEngineService: SearchEngineService,
    private readonly filterService: FilterService,
  ) {}

  @Post('/engine')
  async search(
    @Body() body: SearchDTO,
  ): Promise<ResponseSuccess | ResponseError> {
    let publications = [];

    publications = getPublicationsGoogle(
      await this.searchEngineService.searchGoogleAcademy(body),
    ).filter((item) => item?.type?.name !== 'CITAS');

    publications = publications.concat(
      getPublicationsScielo(await this.searchEngineService.searchScielo(body)),
    );

    if (body.year)
      publications = publications.filter((item) => item.year === body.year);

    const filters = await this.filterService.getFilters(publications);

    return {
      success: 'OK',
      payload: {
        length: publications.length,
        publications: publications,
        filters,
      },
    };
  }
}
