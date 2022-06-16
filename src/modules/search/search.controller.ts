import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import {
  ResponseError,
  ResponseSuccess,
} from 'src/@common/interfaces/response';
import { CreateFavoriteDTO } from './dto/createFavorite.dto';

import { SearchDTO } from './dto/search.dto';
import { FavoritesService } from './services/favorites.service';
import { SearchEngineService } from './services/searchEngine.service';
import { getPublicationsGoogle } from './transforms/getPublicationsGoogle.transform';
import { getPublicationsScielo } from './transforms/getPublicationsScielo.transform';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchEngineService: SearchEngineService,
    private readonly favoriteService: FavoritesService,
  ) {}

  @Post('/favorite/create')
  async createFavorite(
    @Body() body: CreateFavoriteDTO,
  ): Promise<ResponseSuccess | ResponseError> {
    const response: any = await this.favoriteService.create(body);

    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: response,
    };
  }

  @Get('/favorite/all')
  async allFavorities(): Promise<ResponseSuccess | ResponseError> {
    const response: any = await this.favoriteService.findAll();
    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: response,
    };
  }

  @Delete('/favorite/delete')
  async delete(@Query('id') id): Promise<ResponseSuccess | ResponseError> {
    const response = await this.favoriteService.delete(id);

    if (response?.error) throw new BadRequestException(response);

    return { success: 'OK' };
  }

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

    return {
      success: 'OK',
      payload: {
        length: publications.length,
        publications,
      },
    };
  }
}
