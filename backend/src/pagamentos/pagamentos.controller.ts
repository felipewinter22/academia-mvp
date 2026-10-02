import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { FindPagamentosDto } from './dto/find-pagamentos.dto';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Get()
  findAll(@Query() filtros: FindPagamentosDto) {
    return this.pagamentosService.findAll(filtros);
  }

  @Post()
  create(@Body() dto: CreatePagamentoDto) {
    return this.pagamentosService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentosService.remove(id);
  }
}
