import { Length, IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProfile {
  @IsString()
  @IsOptional()
  @Length(2, 50)
  name: string;

  @IsString()
  @IsOptional()
  @Length(2, 50)
  lastname: string;

  @IsOptional()
  @IsString()
  @Length(9, 15)
  phone: string;

  @IsOptional()
  @Length(9, 15)
  document: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsNumber()
  categoryId: number;
}
