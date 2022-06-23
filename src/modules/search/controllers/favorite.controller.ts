import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async allFavorities(
    @Request() req,
  ): Promise<ResponseSuccess | ResponseError> {
    const response: any = await this.favoriteService.findAll(req.user.id);
    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: response,
    };
  }

  @Post('/delete')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Query('id') id): Promise<ResponseSuccess | ResponseError> {
    const response = await this.favoriteService.delete(id);

    if (response?.error) throw new BadRequestException(response);

    return { success: 'OK' };
  }
}
