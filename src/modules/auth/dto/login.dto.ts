import { Length, IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 30)
  password: string;
}
