import Usuario from '../../domain/usuario/Usuario';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UsuarioRepository {
  abstract findById(id: number): Promise<Usuario | null>;

  abstract findByLogin(login: string): Promise<Usuario | null>;

  abstract create(data: Partial<Usuario>): Promise<void | null>;
}
