import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../../ports/UsuarioRepository';
import Usuario from '../../../domain/usuario/Usuario';

@Injectable()
export class GetUsuario {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async getByLogin(login: string): Promise<Omit<Usuario, 'senha'> | null> {
    const usuario = await this.usuarioRepository.findByLogin(login);
    if (!usuario) return null;
    const { senha, ...usuarioData } = usuario;
    return usuarioData;
  }

  async getById(id: number): Promise<Omit<Usuario, 'senha'> | null> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) return null;
    const { senha, ...usuarioData } = usuario;
    return usuarioData;
  }

  async getByLoginWithPassword(login: string): Promise<Usuario> {
    return await this.usuarioRepository.findByLogin(login);
  }
}
