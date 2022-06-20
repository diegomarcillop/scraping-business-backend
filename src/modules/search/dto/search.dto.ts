import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchDTO {
  @IsOptional()
  @IsNumber()
  quantity: string;

  @IsString()
  q: string;

  @IsOptional()
  @IsNumber()
  totalPages: string;

  @IsOptional()
  @IsNumber()
  page: string;

  @IsOptional()
  @IsNumber()
  year: number;
}
