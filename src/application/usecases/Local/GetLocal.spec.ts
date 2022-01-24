import { LocalRepository } from '../../ports/LocalRepository';
import Local from '../../../domain/local/Local';
import Endereco from '../../../domain/endereco/Endereco';
import { ApplicationException } from '../../exceptions/ApplicationException';
import { GetLocal } from './GetLocal';

describe('GetLocal', () => {
  let getLocal: GetLocal;
  let repository: Partial<LocalRepository>;
  beforeEach(() => {
    repository = {
      findAll: async (): Promise<Local[]> => [],
      findById: async (id): Promise<Local> =>
        id === 1 ? new Local('', new Endereco('', '', '', 1, '')) : null,
      countByUsuario: () => null,
    };
    getLocal = new GetLocal(repository as LocalRepository);
  });

  test('should call findByID in execute', async () => {
    const spy = jest.spyOn(repository, 'findById');
    await getLocal.execute({ usuarioId: 1, id: 1 });
    expect(spy).toBeCalled();
  });

  test('should call throw an error if local not found', async () => {
    const call = async () => await getLocal.execute({ usuarioId: 2, id: 1 });
    await expect(call).rejects.toThrowError(ApplicationException);
  });

  test('should call findAll if id is not provided', async () => {
    const spy = jest.spyOn(repository, 'findAll');
    await getLocal.execute({ usuarioId: 1 });
    expect(spy).toBeCalled();
  });
});
