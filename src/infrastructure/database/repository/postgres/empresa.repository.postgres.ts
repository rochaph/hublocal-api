import { PrismaClient } from '@prisma/client';
import { EmpresaRepository } from '../../../../application/ports/EmpresaRepository';
import Empresa from '../../../../domain/empresa/Empresa';
import { EmpresaMapper } from '../../../mapper/empresa.mapper';

export class EmpresaRepositoryPostgres implements EmpresaRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async findAll() {
    const empresas = await this.client.empresa.findMany({
      include: { usuario: true },
    });
    return new EmpresaMapper().mapAll(empresas);
  }

  async findById(id: number) {
    const empresa = await this.client.empresa.findUnique({
      where: { id },
      include: { usuario: true },
    });
    return new EmpresaMapper().map(empresa);
  }

  async create(data: Omit<Empresa, 'id'>) {
    await this.client.empresa.create({ data });
  }

  async update(
    id: number,
    data: Partial<Omit<Empresa, 'id' | 'usuario' | 'locais' | 'responsaveis'>>,
  ) {
    await this.client.empresa.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.client.empresa.delete({ where: { id } });
  }
}
