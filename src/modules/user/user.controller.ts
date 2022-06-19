import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
  ResponseError,
  ResponseSuccess,
} from '../../@common/interfaces/response';
import { UpdateBusiness } from './dto/updateBusiness.dto';
import { UpdateProfile } from './dto/updateProfile.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req): Promise<ResponseSuccess | ResponseError> {
    const response: any = await this.userService.getProfile(req.user.id);
    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: response,
    };
  }

  @Get('/business')
  @UseGuards(AuthGuard('jwt'))
  async getBusiness(@Request() req): Promise<ResponseSuccess | ResponseError> {
    const response: any = await this.userService.getBusiness(req.user.id);
    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: response,
    };
  }

  @Put('/update')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(
    @Request() req,
    @Body() body: UpdateProfile,
  ): Promise<ResponseSuccess | ResponseError> {
    const response: any = await this.userService.updateProfile(
      req.user.id,
      body,
    );
    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: response,
    };
  }

  @Put('/business')
  @UseGuards(AuthGuard('jwt'))
  async updateBusiness(
    @Request() req,
    @Body() body: UpdateBusiness,
  ): Promise<ResponseSuccess | ResponseError> {
    const response: any = await this.userService.updateBusiness(
      req.user.id,
      body,
    );
    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: response,
    };
  }
}
