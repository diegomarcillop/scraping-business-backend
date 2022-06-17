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
import { CreateFavoriteDTO } from '../dto/createFavorite.dto';

import { FavoritesService } from '../services/favorites.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Post('/create')
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

  @Get('/all')
  async allFavorities(): Promise<ResponseSuccess | ResponseError> {
    const response: any = await this.favoriteService.findAll();
    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: response,
    };
  }

  @Delete('/delete')
  async delete(@Query('id') id): Promise<ResponseSuccess | ResponseError> {
    const response = await this.favoriteService.delete(id);

    if (response?.error) throw new BadRequestException(response);

    return { success: 'OK' };
  }
}
