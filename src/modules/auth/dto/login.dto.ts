import { Length, IsEmail, IsString, IsOptional } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsOptional()
  code: string;

  @IsString()
  @Length(3, 30)
  password: string;
}
