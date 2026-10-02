import { IsOptional, IsString } from 'class-validator';

export class FindPagamentosDto {
  @IsOptional()
  @IsString()
  alunoId?: string;
}
