import { IsOptional, IsString } from 'class-validator';

export class FindCheckinsDto {
  @IsOptional()
  @IsString()
  alunoId?: string;
}
