import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

function handleWriteError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      throw new ConflictException('Já existe um aluno com esse e-mail');
    }
    if (error.code === 'P2003') {
      throw new BadRequestException('O plano informado não existe');
    }
  }
  throw error;
}

@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.aluno.findMany({
      include: { plano: true },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: string) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id },
      include: { plano: true },
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno ${id} não encontrado`);
    }

    return aluno;
  }

  async create(dto: CreateAlunoDto) {
    try {
      return await this.prisma.aluno.create({
        data: dto,
        include: { plano: true },
      });
    } catch (error) {
      handleWriteError(error);
    }
  }

  async update(id: string, dto: UpdateAlunoDto) {
    await this.findOne(id);

    try {
      return await this.prisma.aluno.update({
        where: { id },
        data: dto,
        include: { plano: true },
      });
    } catch (error) {
      handleWriteError(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.aluno.delete({ where: { id } });
  }
}
