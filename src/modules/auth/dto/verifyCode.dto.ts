import { IsEmail, IsNumber } from 'class-validator';

export class VerifyCodeDTO {
  @IsEmail()
  email: string;

  @IsNumber()
  code: number;
}
