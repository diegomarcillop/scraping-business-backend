import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFavoriteDTO {
  @IsNumber()
  userId: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  siteUrl: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  authors: string;

  @IsOptional()
  @IsString()
  journal: string;

  @IsString()
  origin: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsNumber()
  quotes: number;

  @IsOptional()
  @IsString()
  typeKey: string;

  @IsOptional()
  @IsString()
  code: string;
}
