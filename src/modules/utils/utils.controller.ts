import { Controller, Get } from '@nestjs/common';

import {
  ResponseError,
  ResponseSuccess,
} from '../../@common/interfaces/response';
import { UtilsService } from './utils.service';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsServices: UtilsService) {}

  @Get('/category/all')
  async getProfile(): Promise<ResponseSuccess | ResponseError> {
    const response: any = await this.utilsServices.getAllCategories();

    return {
      success: 'OK',
      payload: response,
    };
  }
}
