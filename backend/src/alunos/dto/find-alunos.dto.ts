import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FindAlunosDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  planoId?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  ativo?: boolean;
}
