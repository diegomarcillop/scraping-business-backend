import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateBusiness {
  @IsString()
  @IsOptional()
  @Length(2, 50)
  name: string;

  @IsString()
  @IsOptional()
  nit: string;
}
