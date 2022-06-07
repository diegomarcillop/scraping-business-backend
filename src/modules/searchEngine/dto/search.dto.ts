import { IsNumber, IsString } from 'class-validator';

export class SearchDTO {
  @IsNumber()
  quantity: string;

  @IsString()
  q: string;

  @IsNumber()
  totalPages: string;

  @IsNumber()
  page: string;
}
