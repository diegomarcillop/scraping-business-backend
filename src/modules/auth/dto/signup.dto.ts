import { IsEmail, Length, IsString } from 'class-validator';

export class SignupDTO {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsString()
  @Length(2, 50)
  lastname: string;

  @IsString()
  @Length(9, 18)
  phone: string;

  @IsEmail()
  email: string;

  @Length(3, 30)
  password: string;
}
