import { UsuarioRepository } from '../../ports/UsuarioRepository';
import { CreateUsuario } from './CreateUsuario';
import { GetUsuario } from './GetUsuario';
import Usuario from '../../../domain/usuario/Usuario';

describe('CreateUsuario', () => {
  let getUsuario: GetUsuario;
  let repository: UsuarioRepository;
  beforeEach(() => {
    repository = {
      create: (): null => null,
      findByLogin: async (): Promise<Usuario> => new Usuario('teste', 'teste'),
      findById: (): null => null,
    };
    getUsuario = new GetUsuario(repository);
  });

  test('should call findByID', async () => {
    const spy = jest.spyOn(repository, 'findById');

    await getUsuario.getById(1);

    expect(spy).toBeCalled();
  });

  test('should call findByLogin', async () => {
    const spy = jest.spyOn(repository, 'findByLogin');

    await getUsuario.getByLogin('login');

    expect(spy).toBeCalled();
  });

  test('should call return user without password', async () => {
    const usuario = await getUsuario.getByLogin('login');

    expect(usuario).toMatchObject({ login: 'teste' });
    expect(usuario).not.toHaveProperty('senha');
  });

  test('should call findByLogin in getByLoginWithPassword', async () => {
    const spy = jest.spyOn(repository, 'findByLogin');

    await getUsuario.getByLoginWithPassword('login');

    expect(spy).toBeCalled();
  });

  test('should call usuario have password in getByLoginWithPassword', async () => {
    const usuario = await getUsuario.getByLoginWithPassword('login');

    expect(usuario).toMatchObject({ login: 'teste', senha: 'teste' });
    expect(usuario).toHaveProperty('senha');
  });
});
