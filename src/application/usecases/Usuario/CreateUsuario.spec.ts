import { UsuarioRepository } from '../../ports/UsuarioRepository';
import { CreateUsuario } from './CreateUsuario';

describe('CreateUsuario', () => {
  let createUsuario: CreateUsuario;
  let repository: UsuarioRepository;
  beforeEach(() => {
    repository = {
      create: (): null => null,
      findByLogin: (): null => null,
      findById: (): null => null,
    };
    createUsuario = new CreateUsuario(repository);
  });

  test('should call create', async () => {
    const spy = jest.spyOn(repository, 'create');

    await createUsuario.execute({ login: '1231223', senha: '123121233' });

    expect(spy).toBeCalled();
  });
});
