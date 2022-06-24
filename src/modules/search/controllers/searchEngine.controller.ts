import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ResponseError,
  ResponseSuccess,
} from 'src/@common/interfaces/response';

import { SearchDTO } from '../dto/search.dto';
import { FilterService } from '../services/filter.service';
import { HistoryService } from '../services/history.service';
import { SearchEngineService } from '../services/searchEngine.service';
import { getPublicationsGoogle } from '../transforms/getPublicationsGoogle.transform';
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
    body.quantity = body.quantity / 2;

    /*publications = getPublicationsGoogle(
      await this.searchEngineService.searchGoogleAcademy(body),
    ).filter((item) => item?.type?.name !== 'CITAS');*/

    publications = publications.concat(
      getPublicationsScielo(await this.searchEngineService.searchScielo(body)),
    );

    publications = publications.concat(
      getPublicationsRedalyc(
        await this.searchEngineService.searchRedalyc(body),
      ),
    );

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
