import { UsuarioRepository } from '../../../../application/ports/UsuarioRepository';
import { PrismaClient } from '@prisma/client';
import { UsuarioMapper } from '../../../mapper/usuario.mapper';
import Usuario from '../../../../domain/usuario/Usuario';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRepositoryPostgres implements UsuarioRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async findAll() {
    const users = await this.client.usuario.findMany();
    return new UsuarioMapper().mapAll(users);
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

  async update(id: number, data: Partial<Usuario>) {
    await this.client.usuario.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.client.usuario.delete({ where: { id } });
  }
}
