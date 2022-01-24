import { LocalRepository } from '../../ports/LocalRepository';
import Local from '../../../domain/local/Local';
import Endereco from '../../../domain/endereco/Endereco';
import { ApplicationException } from '../../exceptions/ApplicationException';
import { DeleteLocal } from './DeleteLocal';

describe('DeleteLocal', () => {
  let deleteLocal: DeleteLocal;
  let repository: Partial<LocalRepository>;
  beforeEach(() => {
    repository = {
      delete: () => null,
      findAll: async (): Promise<Local[]> => [],
      findById: async (id): Promise<Local> =>
        id === 1 ? new Local('', new Endereco('', '', '', 1, '')) : null,
    };
    deleteLocal = new DeleteLocal(repository as LocalRepository);
  });

  test('should call findByID in execute', async () => {
    const spy = jest.spyOn(repository, 'findById');
    await deleteLocal.execute(1, 1);
    expect(spy).toBeCalled();
  });

  test('should call throw an error if local not found', async () => {
    const call = async () => await deleteLocal.execute(2, 1);
    await expect(call).rejects.toThrowError(ApplicationException);
  });

  test('should call delete', async () => {
    const spy = jest.spyOn(repository, 'delete');
    await deleteLocal.execute(1, 1);
    expect(spy).toBeCalled();
  });
});
