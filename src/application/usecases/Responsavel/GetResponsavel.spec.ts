import { EmpresaRepository } from '../../ports/EmpresaRepository';
import { GetResponsavel } from './GetResponsavel';
import Empresa from '../../../domain/empresa/Empresa';
import { ApplicationException } from '../../exceptions/ApplicationException';

describe('GetResponsavel', () => {
  let getResponsavel: GetResponsavel;
  let repository: Partial<EmpresaRepository>;
  beforeEach(() => {
    repository = {
      findById: async (id, empresaid): Promise<Empresa> =>
        id === empresaid ? new Empresa('', '', '') : null,
    };
    getResponsavel = new GetResponsavel(repository as EmpresaRepository);
  });

  test('should call findByID', async () => {
    const spy = jest.spyOn(repository, 'findById');
    await getResponsavel.execute(1, 1);
    expect(spy).toBeCalled();
  });

  test('should throw an error if not found', async () => {
    const call = async () => await getResponsavel.execute(1, 2);
    await expect(call).rejects.toThrowError(ApplicationException);
  });
});
