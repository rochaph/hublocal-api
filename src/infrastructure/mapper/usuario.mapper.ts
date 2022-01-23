import Usuario from '../../domain/usuario/Usuario';
import { Mapper } from './mapper';

type Entity = Usuario & { id: number };

export class UsuarioMapper implements Mapper<Usuario> {
  public map({ login, senha, empresas, id }: Entity): Usuario {
    return new Usuario(login, senha, empresas, id);
  }

  public mapAll(entities: Entity[]): Usuario[] {
    const mappedUsuarios = entities.map(
      ({ login, senha, empresas, id }) =>
        new Usuario(login, senha, empresas, id),
    );
    return mappedUsuarios;
  }
}
