import { ApplicationException } from '../../exceptions/ApplicationException';
import { UpdateEmpresa } from './UpdateEmpresa';
import { EmpresaRepository } from '../../ports/EmpresaRepository';
import Empresa from '../../../domain/empresa/Empresa';

describe('UpdateEmpresa', () => {
  let updateEmpresa: UpdateEmpresa;
  let repository: Partial<EmpresaRepository>;
  beforeEach(() => {
    repository = {
      findById: async (id) => (id === 1 ? new Empresa('', '', '') : null),
      update: () => null,
    };
    updateEmpresa = new UpdateEmpresa(repository as EmpresaRepository);
  });

  test('should call findByID in UpdateEmpresa', async () => {
    const spy = jest.spyOn(repository, 'findById');
    await updateEmpresa.execute(1, 1, {});
    expect(spy).toBeCalled();
  });

  test('should call throw an error if empresa not found', async () => {
    const call = async () => await updateEmpresa.execute(2, 1, {});
    await expect(call).rejects.toThrowError(ApplicationException);
  });

  test('should call update in UpdateEmpresa', async () => {
    const spy = jest.spyOn(repository, 'update');
    await updateEmpresa.execute(1, 1, {});
    expect(spy).toBeCalled();
  });
});
