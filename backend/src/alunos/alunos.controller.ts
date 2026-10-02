import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { FindAlunosDto } from './dto/find-alunos.dto';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Get()
  findAll(@Query() filtros: FindAlunosDto) {
    return this.alunosService.findAll(filtros);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunosService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAlunoDto) {
    return this.alunosService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlunoDto) {
    return this.alunosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunosService.remove(id);
  }
}
