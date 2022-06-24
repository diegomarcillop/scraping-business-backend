import { IsNumber, IsString } from 'class-validator';

export class CreateHistoryDTO {
  @IsNumber()
  userId: number;

  @IsString()
  text: string;

  @IsNumber()
  quantity: number;
}
