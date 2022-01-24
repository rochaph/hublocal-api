import { ApplicationException } from '../../exceptions/ApplicationException';
import { DeleteEmpresa } from './DeleteEmpresa';
import { EmpresaRepository } from '../../ports/EmpresaRepository';
import Empresa from '../../../domain/empresa/Empresa';

describe('DeleteEmpresa', () => {
  let deleteEmpresa: DeleteEmpresa;
  let repository: Partial<EmpresaRepository>;
  beforeEach(() => {
    repository = {
      delete: () => null,
      findAll: async (): Promise<Empresa[]> => [],
      findById: async (id): Promise<Empresa> =>
        id === 1 ? new Empresa('', '', '') : null,
    };
    deleteEmpresa = new DeleteEmpresa(repository as EmpresaRepository);
  });

  test('should call findByID in execute', async () => {
    const spy = jest.spyOn(repository, 'findById');
    await deleteEmpresa.execute(1, 1);
    expect(spy).toBeCalled();
  });

  test('should call throw an error if empresa not found', async () => {
    const call = async () => await deleteEmpresa.execute(2, 1);
    await expect(call).rejects.toThrowError(ApplicationException);
  });

  test('should call delete', async () => {
    const spy = jest.spyOn(repository, 'delete');
    await deleteEmpresa.execute(1, 1);
    expect(spy).toBeCalled();
  });
});
