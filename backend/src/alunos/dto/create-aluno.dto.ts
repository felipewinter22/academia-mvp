import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  @MinLength(1)
  nome: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsDateString()
  dataNascimento?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsString()
  planoId?: string;
}
