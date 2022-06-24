import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ResponseError,
  ResponseSuccess,
} from 'src/@common/interfaces/response';
import { CreateHistoryDTO } from '../dto/createHistory.dto';

import { HistoryService } from '../services/history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  async createHistory(
    @Body() body: CreateHistoryDTO,
  ): Promise<ResponseSuccess | ResponseError> {
    const response: any = await this.historyService.create(body);

    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: response,
    };
  }

  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  async allHistory(@Request() req): Promise<ResponseSuccess | ResponseError> {
    const response: any = await this.historyService.findAll(req.user.id);
    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: response,
    };
  }
}
