import { PrismaClient } from '@prisma/client';
import { ResponsavelRepository } from '../../../../application/ports/ResponsavelRepository';
import Responsavel from '../../../../domain/responsavel/Responsavel';
import { ResponsavelMapper } from '../../../mapper/responsavel.mapper';

export class ResponsavelRepositoryPostgres implements ResponsavelRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async findAll() {
    const responsaveis = await this.client.responsavel.findMany({
      include: { endereco: { include: { uf: true } } },
    });
    return new ResponsavelMapper().mapAll(responsaveis);
  }

  async findById(id: number) {
    const responsavel = await this.client.responsavel.findUnique({
      where: { id },
      include: { endereco: { include: { uf: true } } },
    });
    return new ResponsavelMapper().map(responsavel);
  }

  async create(data: Omit<Responsavel, 'id'>) {
    await this.client.responsavel.create({ data });
  }

  async update(
    id: number,
    data: Partial<Omit<Responsavel, 'id' | 'empresas' | 'locais' | 'endereco'>>,
  ) {
    await this.client.responsavel.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.client.responsavel.delete({ where: { id } });
  }
}
