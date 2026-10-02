import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { FindPagamentosDto } from './dto/find-pagamentos.dto';

@Injectable()
export class PagamentosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(filtros: FindPagamentosDto = {}) {
    return this.prisma.pagamento.findMany({
      where: { ...(filtros.alunoId && { alunoId: filtros.alunoId }) },
      include: { aluno: { select: { nome: true } } },
      orderBy: { data: 'desc' },
    });
  }

  async create(dto: CreatePagamentoDto) {
    try {
      return await this.prisma.pagamento.create({ data: dto });
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
    const pagamento = await this.prisma.pagamento.findUnique({
      where: { id },
    });

    if (!pagamento) {
      throw new NotFoundException(`Pagamento ${id} não encontrado`);
    }

    return this.prisma.pagamento.delete({ where: { id } });
  }
}
