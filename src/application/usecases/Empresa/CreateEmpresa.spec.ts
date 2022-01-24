import { EmpresaRepository } from '../../ports/EmpresaRepository';
import Empresa from '../../../domain/empresa/Empresa';
import { CreateEmpresa } from './CreateEmpresa';
import Responsavel from '../../../domain/responsavel/Responsavel';
import { EnderecoWithUfString } from '../../ports/Endereco';
import Local from '../../../domain/local/Local';

const mocks: Pick<Empresa, 'nome' | 'cnpj' | 'descricao'> & {
  usuarioId: number;
  responsaveis: (Pick<Responsavel, 'nome' | 'telefone' | 'principal'> & {
    endereco: EnderecoWithUfString;
  })[];
  locais: (Pick<Local, 'nome'> & { endereco: EnderecoWithUfString })[];
} = {
  nome: '1',
  locais: [],
  responsaveis: [
    {
      principal: true,
      telefone: '11111111111',
      nome: '1',
      endereco: {
        rua: '1',
        numero: 1,
        bairro: '1',
        cidade: '1',
        cep: '11111111',
        uf: 'MS',
      },
    },
  ],
  cnpj: '11111111111111',
  descricao: '1',
  usuarioId: 1,
};

describe('CreateEmpresa', () => {
  let createEmpresa: CreateEmpresa;
  let repository: Partial<EmpresaRepository>;
  beforeEach(() => {
    repository = {
      create: (): null => null,
    };

    createEmpresa = new CreateEmpresa(repository as EmpresaRepository);
  });

  test('should call create in usecase', async () => {
    const spy = jest.spyOn(repository, 'create');
    await createEmpresa.execute(mocks);

    expect(spy).toBeCalled();
  });
});
