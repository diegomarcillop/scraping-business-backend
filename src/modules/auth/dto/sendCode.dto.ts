import { IsEmail } from 'class-validator';

export class SendCodeDTO {
  @IsEmail()
  email: string;
}
