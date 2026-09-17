import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Libera acesso do frontend (Next.js) para quando a integração for feita
  app.enableCors();

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 Backend rodando em http://localhost:${port}`);
}
void bootstrap();
