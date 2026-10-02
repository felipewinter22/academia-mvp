import { IsString } from 'class-validator';

export class CreateCheckinDto {
  @IsString()
  alunoId: string;
}
