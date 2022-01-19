import { UsuarioRepository } from '../../ports/UsuarioRepository';
import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../exceptions/ApplicationException';
import { UsuarioFactory } from '../../factories/UsuarioFactory';

@Injectable()
export class CreateUsuario {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(data: { login: string; senha: string }) {
    const user = await this.usuarioRepository.findByLogin(data.login);
    if (user) throw new ApplicationException('Login is already in use');
    const usuario = await new UsuarioFactory().create(data);
    await this.usuarioRepository.create(usuario);
  }
}
