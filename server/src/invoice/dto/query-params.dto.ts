import { Transform } from 'class-transformer';
import { IsNumber, Max, Min, IsOptional } from 'class-validator';

export class QueryParamsDto {
  @Transform(({ value }) => (!isNaN(Number(value)) ? Number(value) : 1))
  @IsNumber()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @Transform(({ value }) => (!isNaN(Number(value)) ? Number(value) : 30))
  @IsNumber()
  @Max(30)
  @Min(1)
  @IsOptional()
  take: number = 30;
}
