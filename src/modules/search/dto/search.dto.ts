import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchDTO {
  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsString()
  q: string;

  @IsOptional()
  @IsNumber()
  totalPages: string;

  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  year: number;
}
