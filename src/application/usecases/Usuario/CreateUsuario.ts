import { UsuarioRepository } from '../../ports/UsuarioRepository';
import Usuario from '../../../domain/usuario/Usuario';
import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../exceptions/ApplicationException';

@Injectable()
export class CreateUsuario {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async handle(data: Omit<Usuario, 'id'>) {
    try {
      const user = await this.usuarioRepository.findByLogin(data.login);
      if (user) throw new Error('Login is already in use');
      await this.usuarioRepository.create(data);
    } catch (e) {
      throw new ApplicationException(e.message);
    }
  }
}
