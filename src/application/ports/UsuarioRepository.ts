import { BaseRepository } from './BaseRepository';
import Usuario from '../../domain/usuario/Usuario';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UsuarioRepository extends BaseRepository<Usuario> {
  abstract findByLogin(login: string): Promise<Usuario | null>;
}
