import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.aluno.findMany({
      include: { plano: true },
      orderBy: { nome: 'asc' },
    });
  }
}
