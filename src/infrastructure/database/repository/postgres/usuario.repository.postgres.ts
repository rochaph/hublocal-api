import { UsuarioRepository } from '../../../../application/ports/UsuarioRepository';
import { PrismaClient } from '@prisma/client';
import { UsuarioMapper } from '../../../mapper/usuario.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRepositoryPostgres implements UsuarioRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async findById(id: number) {
    const user = await this.client.usuario.findUnique({ where: { id } });
    if (!user) return null;
    return new UsuarioMapper().map(user);
  }

  async findByLogin(login: string) {
    const user = await this.client.usuario.findUnique({ where: { login } });
    if (!user) return null;
    return new UsuarioMapper().map(user);
  }

  async create(data: { login: string; senha: string }) {
    await this.client.usuario.create({ data });
  }
}
