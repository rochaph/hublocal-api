import { UFS } from '../../../../../application/enums/UfEnum';
import { PrismaClient } from '@prisma/client';

async function populateUf() {
  const client = new PrismaClient();
  for (const uf in UFS) {
    await client.uf.create({ data: { sigla: uf } });
  }
}

populateUf();
