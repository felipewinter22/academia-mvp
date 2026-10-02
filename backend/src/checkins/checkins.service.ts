import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { FindCheckinsDto } from './dto/find-checkins.dto';

@Injectable()
export class CheckinsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(filtros: FindCheckinsDto = {}) {
    return this.prisma.checkin.findMany({
      where: { ...(filtros.alunoId && { alunoId: filtros.alunoId }) },
      include: { aluno: { select: { nome: true } } },
      orderBy: { dataHora: 'desc' },
    });
  }

  async create(dto: CreateCheckinDto) {
    try {
      return await this.prisma.checkin.create({ data: dto });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException('O aluno informado não existe');
      }
      throw error;
    }
  }

  async remove(id: string) {
    const checkin = await this.prisma.checkin.findUnique({ where: { id } });

    if (!checkin) {
      throw new NotFoundException(`Check-in ${id} não encontrado`);
    }

    return this.prisma.checkin.delete({ where: { id } });
  }
}
