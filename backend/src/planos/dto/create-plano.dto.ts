import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class CreatePlanoDto {
  @IsString()
  @MinLength(1)
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNumber()
  @IsPositive()
  precoMensal: number;
}
