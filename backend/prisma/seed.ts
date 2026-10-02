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

  const planoPremium = await prisma.plano.upsert({
    where: { id: 'seed-plano-premium' },
    update: {},
    create: {
      id: 'seed-plano-premium',
      nome: 'Plano Premium',
      descricao: 'Acesso total, inclusive aulas em grupo',
      precoMensal: 179.9,
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

  const alunos = [
    {
      nome: 'Ana Souza',
      email: 'ana.souza@example.com',
      telefone: '49999990001',
      ativo: true,
      planoId: planoPremium.id,
    },
    {
      nome: 'Bruno Lima',
      email: 'bruno.lima@example.com',
      telefone: '49999990002',
      ativo: true,
      planoId: planoBasico.id,
    },
    {
      nome: 'Carla Mendes',
      email: 'carla.mendes@example.com',
      telefone: '49999990003',
      ativo: true,
      planoId: planoBasico.id,
    },
    {
      nome: 'Diego Ferreira',
      email: 'diego.ferreira@example.com',
      telefone: '49999990004',
      ativo: false,
      planoId: planoPremium.id,
    },
    {
      nome: 'Elisa Rocha',
      email: 'elisa.rocha@example.com',
      telefone: '49999990005',
      ativo: true,
      planoId: null,
    },
  ];

  const alunosCriados: Record<string, { id: string }> = {};

  for (const aluno of alunos) {
    alunosCriados[aluno.nome] = await prisma.aluno.upsert({
      where: { email: aluno.email },
      update: {},
      create: aluno,
    });
  }

  const pagamentos = [
    {
      id: 'seed-pagamento-1',
      alunoId: alunosCriados['Ana Souza'].id,
      valor: 179.9,
      descricao: 'Mensalidade de setembro',
    },
    {
      id: 'seed-pagamento-2',
      alunoId: alunosCriados['Bruno Lima'].id,
      valor: 99.9,
      descricao: 'Mensalidade de setembro',
    },
  ];

  for (const pagamento of pagamentos) {
    await prisma.pagamento.upsert({
      where: { id: pagamento.id },
      update: {},
      create: pagamento,
    });
  }

  const checkins = [
    { id: 'seed-checkin-1', alunoId: alunosCriados['Ana Souza'].id },
    { id: 'seed-checkin-2', alunoId: alunosCriados['Carla Mendes'].id },
  ];

  for (const checkin of checkins) {
    await prisma.checkin.upsert({
      where: { id: checkin.id },
      update: {},
      create: checkin,
    });
  }

  console.log(
    `Seed concluído. Planos: ${planoBasico.nome}, ${planoPremium.nome}. Alunos: ${alunos.length}. Pagamentos: ${pagamentos.length}. Check-ins: ${checkins.length}.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
