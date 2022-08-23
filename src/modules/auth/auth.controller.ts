import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CryptoService } from 'src/@common/services/crypto.service';
import {
  ResponseError,
  ResponseSuccess,
} from '../../@common/interfaces/response';
import { MailService } from '../mail/mail.service';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { LoginDTO } from './dto/login.dto';
import { SendCodeDTO } from './dto/sendCode.dto';
import { SignupDTO } from './dto/signup.dto';
import { VerifyCodeDTO } from './dto/verifyCode.dto';
import { LoginService } from './services/login.service';
import { RecoverPasswordService } from './services/recoverPassword.service';
import { SignUpService } from './services/signup.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly loginService: LoginService,
    private readonly signupService: SignUpService,
    private readonly recoverPasswordService: RecoverPasswordService,
    private readonly mailService: MailService,
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

    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
      payload: response,
    };
  }

  @Post('/send-code')
  async sendCode(
    @Body() body: SendCodeDTO,
  ): Promise<ResponseSuccess | ResponseError> {
    body.email = body.email.toLowerCase();

    const response: any = await this.recoverPasswordService.sendCode(body);

    if (response.error) throw new BadRequestException(response);

    //Send email
    await this.mailService.sendEmail({
      templateName: 'recoverPassword',
      email: body.email,
      subject: 'Recuperación de contraseña',
      name: response.person.name,
      code: response.code,
      url: '',
    });

    return {
      success: 'OK',
      payload: response.code,
    };
  }

  @Post('/verify-code')
  async verifyCode(
    @Body() body: VerifyCodeDTO,
  ): Promise<ResponseSuccess | ResponseError> {
    body.email = body.email.toLowerCase();

    const response: any = await this.recoverPasswordService.verifyCode(body);

    if (response.error) throw new BadRequestException(response);

    return {
      success: 'OK',
    };
  }

  @Post('/change-password')
  async changePassword(
    @Body() body: ChangePasswordDTO,
  ): Promise<ResponseSuccess | ResponseError> {
    body.email = body.email.toLowerCase();
    body.password = this.cryptoService.encrypt(body.password);

    const response: any = await this.recoverPasswordService.changePassword(
      body,
    );

    if (response?.error) throw new BadRequestException(response);

    return {
      success: 'OK',
    };
  }
}
