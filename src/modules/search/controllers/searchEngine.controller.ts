import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ResponseError,
  ResponseSuccess,
} from 'src/@common/interfaces/response';
import { getTextConditions } from 'src/@common/utils/getTextConditions';

import { SearchDTO } from '../dto/search.dto';
import { FilterService } from '../services/filter.service';
import { HistoryService } from '../services/history.service';
import { SearchEngineService } from '../services/searchEngine.service';
import { getPublicationsLibgen } from '../transforms/getPublicationsLibgen.transform';
//import { getPublicationsGoogle } from '../transforms/getPublicationsGoogle.transform';
import { getPublicationsRedalyc } from '../transforms/getPublicationsRedalyc.transform';
import { getPublicationsScielo } from '../transforms/getPublicationsScielo.transform';

@Controller('search')
export class SearchEngineController {
  constructor(
    private readonly searchEngineService: SearchEngineService,
    private readonly filterService: FilterService,
    private readonly historyService: HistoryService,
  ) {}

  @Post('/engine')
  @UseGuards(AuthGuard('jwt'))
  async search(
    @Request() req,
    @Body() body: SearchDTO,
  ): Promise<ResponseSuccess | ResponseError> {
    let publications = [];

    const quantity = body.quantity;
    body.quantity = body.quantity / 2;
    body.q = getTextConditions(body.q);

    console.error(body, '////');

    if (body.page === 1)
      publications = publications.concat(
        getPublicationsRedalyc(
          await this.searchEngineService.searchRedalyc(body),
        ),
      );

    if (publications.length === 0) body.quantity = quantity;

    publications = publications.concat(
      getPublicationsScielo(await this.searchEngineService.searchScielo(body)),
    );

    const filterScielo = publications.filter(
      (item) => item.origin === 'Scielo',
    );

    if (filterScielo.length === 0) {
      publications = publications.concat(
        getPublicationsLibgen(
          await this.searchEngineService.searchLibgen(body),
        ),
      );
    }

    if (body.year)
      publications = publications.filter((item) => item.year === body.year);

    const filters = await this.filterService.getFilters(publications);

    this.historyService.create({
      text: body.q,
      userId: req.user.id,
      quantity: publications.length,
    });

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
