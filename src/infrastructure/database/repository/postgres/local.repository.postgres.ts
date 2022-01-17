import { PrismaClient } from '@prisma/client';
import { LocalRepository } from '../../../../application/ports/LocalRepository';
import { LocalMapper } from '../../../mapper/local.mapper';
import Local from '../../../../domain/local/Local';

export class LocalRepositoryPostgres implements LocalRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async findAll() {
    const local = await this.client.local.findMany({
      include: {
        empresa: { include: { usuario: true } },
        endereco: { include: { uf: true } },
      },
    });

    return new LocalMapper().mapAll(local);
  }

  async findById(id: number) {
    const local = await this.client.local.findUnique({
      where: { id },
      include: {
        empresa: { include: { usuario: true } },
        endereco: { include: { uf: true } },
      },
    });

    return new LocalMapper().map(local);
  }

  async create(data: Omit<Local, 'id'>) {
    await this.client.local.create({ data });
  }

  async update(
    id: number,
    data: Partial<Omit<Local, 'id' | 'empresa' | 'endereco'>>,
  ) {
    await this.client.local.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.client.local.delete({ where: { id } });
  }
}
