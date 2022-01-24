import { ApplicationException } from '../../exceptions/ApplicationException';
import { GetEmpresa } from './GetEmpresa';
import { EmpresaRepository } from '../../ports/EmpresaRepository';
import Empresa from '../../../domain/empresa/Empresa';

describe('GetLocal', () => {
  let getEmpresa: GetEmpresa;
  let repository: Partial<EmpresaRepository>;
  beforeEach(() => {
    repository = {
      findAll: async (): Promise<Empresa[]> => [],
      findById: async (id): Promise<Empresa> =>
        id === 1 ? new Empresa('', '', '') : null,
      countByUsuario: () => null,
    };
    getEmpresa = new GetEmpresa(repository as EmpresaRepository);
  });

  test('should call findByID in execute if id is provided', async () => {
    const spy = jest.spyOn(repository, 'findById');
    await getEmpresa.execute({ usuarioId: 1, id: 1 });
    expect(spy).toBeCalled();
  });

  test('should call throw an error if empresa not found', async () => {
    const call = async () => await getEmpresa.execute({ usuarioId: 2, id: 1 });
    await expect(call).rejects.toThrowError(ApplicationException);
  });

  test('should call findAll if id is not provided', async () => {
    const spy = jest.spyOn(repository, 'findAll');
    await getEmpresa.execute({ usuarioId: 1 });
    expect(spy).toBeCalled();
  });
});
