-- DropForeignKey
ALTER TABLE "alunos" DROP CONSTRAINT "alunos_planoId_fkey";

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "planos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
