import { IsNumber, IsString } from 'class-validator';

export class PublicationDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsNumber()
  year: number;

  @IsNumber()
  quotes: number;
}
