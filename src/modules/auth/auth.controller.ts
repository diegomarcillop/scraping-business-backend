import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CryptoService } from 'src/@common/services/crypto.service';
import {
  ResponseError,
  ResponseSuccess,
} from '../../@common/interfaces/response';
import { LoginDTO } from './dto/login.dto';
import { SignupDTO } from './dto/signup.dto';
import { LoginService } from './services/login.service';
import { SignUpService } from './services/signup.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly loginService: LoginService,
    private readonly signupService: SignUpService,
  ) {}

  @Post('/login')
  async loginAdmin(
    @Body() body: LoginDTO,
  ): Promise<ResponseSuccess | ResponseError> {
    body.email = body?.email?.toLowerCase();
    body.password = this.cryptoService.encrypt(body.password);

    const response: any = await this.loginService.login(body);

    if (response.error) throw new UnauthorizedException(response);

    return {
      success: 'OK',
      payload: await this.jwtService.sign({ ...response }),
    };
  }

  @Post('/signup')
  async signup(
    @Body() body: SignupDTO,
  ): Promise<ResponseSuccess | ResponseError> {
    body.email = body.email.toLowerCase();
    body.password = this.cryptoService.encrypt(body.password);

    const response: any = await this.signupService.signupUser(body);

    if (response.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: await this.jwtService.sign({ ...response }),
    };
  }
}
