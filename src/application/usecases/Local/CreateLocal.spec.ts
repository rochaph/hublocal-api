import { CreateLocal } from './CreateLocal';
import { LocalRepository } from '../../ports/LocalRepository';
import { EmpresaRepository } from '../../ports/EmpresaRepository';
import Empresa from '../../../domain/empresa/Empresa';

const endereco = {
  cep: '00000000',
  cidade: '123',
  bairro: '123',
  numero: 1,
  rua: '123',
  uf: 'MS',
};

const mocks = {
  nome: '123123',
  endereco,
  empresaId: 1,
  responsaveis: [
    { nome: '123123', endereco, principalLocal: true, telefone: '' },
  ],
};

describe('CreateLocal', () => {
  let createLocal: CreateLocal;
  let repository: Partial<LocalRepository>;
  let empresaRepository: Partial<EmpresaRepository>;
  beforeEach(() => {
    repository = {
      create: (): null => null,
    };

    empresaRepository = {
      findById: async (id) => (id === 1 ? new Empresa('', '', '') : null),
    };

    createLocal = new CreateLocal(
      repository as LocalRepository,
      empresaRepository as EmpresaRepository,
    );
  });

  test('should call create', async () => {
    const spy = jest.spyOn(repository, 'create');
    await createLocal.execute(1, mocks);

    expect(spy).toBeCalled();
  });

  test('should throw if empresa not found', async () => {
    const spy = jest.spyOn(repository, 'create');
    await createLocal.execute(1, { ...mocks, empresaId: 2 });

    expect(spy).toBeCalled();
  });
});
