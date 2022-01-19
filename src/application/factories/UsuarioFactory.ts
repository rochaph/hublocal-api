import Usuario from '../../domain/usuario/Usuario';
import Factory from './Factory';
import { HashFactory } from './HashFactory';
import { validateLength } from './Validations';

export class UsuarioFactory implements Factory<Usuario> {
  async create({
    login,
    senha,
  }: {
    login: string;
    senha: string;
  }): Promise<Usuario> {
    validateLength(login, 'usuario login', 6);
    validateLength(senha, 'usuario senha', 8);
    const hash = await new HashFactory().create(senha);
    return new Usuario(login, hash);
  }
}
