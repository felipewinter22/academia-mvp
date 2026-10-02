import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

@Injectable()
export class PlanosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.plano.findMany({ orderBy: { nome: 'asc' } });
  }

  async findOne(id: string) {
    const plano = await this.prisma.plano.findUnique({ where: { id } });

    if (!plano) {
      throw new NotFoundException(`Plano ${id} não encontrado`);
    }

    return plano;
  }

  create(dto: CreatePlanoDto) {
    return this.prisma.plano.create({ data: dto });
  }

  async update(id: string, dto: UpdatePlanoDto) {
    await this.findOne(id);
    return this.prisma.plano.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      return await this.prisma.plano.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new ConflictException(
          'Não é possível excluir um plano com alunos vinculados',
        );
      }
      throw error;
    }
  }
}
