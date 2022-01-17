import { PrismaClient } from '@prisma/client';
import { EnderecoRepository } from '../../../../application/ports/EnderecoRepository';
import { EnderecoMapper } from '../../../mapper/endereco.mapper';
import Endereco from '../../../../domain/endereco/Endereco';

export class EnderecoRepositoryPostgres implements EnderecoRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async findAll() {
    const enderecos = await this.client.endereco.findMany({
      include: { uf: true },
    });
    return new EnderecoMapper().mapAll(enderecos);
  }

  async findById(id: number) {
    const endereco = await this.client.endereco.findUnique({
      where: { id },
      include: { uf: true },
    });

    return new EnderecoMapper().map(endereco);
  }

  async create(data: Omit<Endereco, 'id'>) {
    await this.client.endereco.create({ data });
  }

  async update(id: number, data: Partial<Omit<Endereco, 'id' | 'uf'>>) {
    await this.client.endereco.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.client.endereco.delete({ where: { id } });
  }
}
