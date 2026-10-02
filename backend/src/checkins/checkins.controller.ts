import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { FindCheckinsDto } from './dto/find-checkins.dto';

@Controller('checkins')
export class CheckinsController {
  constructor(private readonly checkinsService: CheckinsService) {}

  @Get()
  findAll(@Query() filtros: FindCheckinsDto) {
    return this.checkinsService.findAll(filtros);
  }

  @Post()
  create(@Body() dto: CreateCheckinDto) {
    return this.checkinsService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkinsService.remove(id);
  }
}
