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
import { getPublicationsRedalyc } from '../transforms/getPublicationsRedalyc.transform';
import { getPublicationsScielo } from '../transforms/getPublicationsScielo.transform';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');
const args = [
  '--disable-notifications',
  '--no-sandbox',
  '--disable-setuid-sandbox',
];

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
    //Init browser
    const browser = await puppeteer.launch({
      headless: true,
      args,
    });

    const text = body.q;
    let publications = [];

    body.q = getTextConditions(body.q);

    if (body.page === 1)
      publications = publications.concat(
        getPublicationsRedalyc(
          await this.searchEngineService.searchRedalyc(body, browser),
        ),
      );

    publications = publications.concat(
      getPublicationsScielo(
        await this.searchEngineService.searchScielo(body, browser),
      ),
    );

    publications = publications.concat(
      getPublicationsLibgen(
        await this.searchEngineService.searchLibgen(body, browser),
      ),
    );

    if (body.year)
      publications = publications.filter((item) => item.year === body.year);

    const filters = await this.filterService.getFilters(publications);

    this.historyService.create({
      userId: req.user.id,
      quantity: publications.length,
      text,
    });

    await browser.close(); // Close browser

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
