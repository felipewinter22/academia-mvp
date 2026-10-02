import { IsDateString, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreatePagamentoDto {
  @IsString()
  alunoId: string;

  @IsNumber()
  @IsPositive()
  valor: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsDateString()
  data?: string;
}
