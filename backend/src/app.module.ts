import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AlunosModule } from './alunos/alunos.module';

@Module({
  imports: [PrismaModule, AlunosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
