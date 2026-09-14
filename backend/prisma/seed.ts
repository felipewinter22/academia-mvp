import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const planoBasico = await prisma.plano.upsert({
    where: { id: 'seed-plano-basico' },
    update: {},
    create: {
      id: 'seed-plano-basico',
      nome: 'Plano Básico',
      descricao: 'Acesso à musculação em horário comercial',
      precoMensal: 99.9,
    },
  });

  await prisma.usuario.upsert({
    where: { email: '[email protected]' },
    update: {},
    create: {
      nome: 'Administrador',
      email: '[email protected]',
      senhaHash: 'trocar-por-hash-real',
      papel: 'ADMIN',
    },
  });

  console.log('Seed concluído. Plano criado:', planoBasico.nome);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
