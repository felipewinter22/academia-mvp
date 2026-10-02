import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AlunosModule } from './alunos/alunos.module';
import { PlanosModule } from './planos/planos.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { CheckinsModule } from './checkins/checkins.module';

@Module({
  imports: [
    PrismaModule,
    AlunosModule,
    PlanosModule,
    PagamentosModule,
    CheckinsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
