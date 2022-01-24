import { UpdateLocal } from './UpdateLocal';
import { LocalRepository } from '../../ports/LocalRepository';
import Local from '../../../domain/local/Local';
import Endereco from '../../../domain/endereco/Endereco';
import { ApplicationException } from '../../exceptions/ApplicationException';

describe('GetResponsavel', () => {
  let updateLocal: UpdateLocal;
  let repository: Partial<LocalRepository>;
  beforeEach(() => {
    repository = {
      findById: async (id): Promise<Local> =>
        id === 1 ? new Local('', new Endereco('', '', '', 1, '')) : null,
      update: () => null,
    };
    updateLocal = new UpdateLocal(repository as LocalRepository);
  });

  test('should call findByID in execute', async () => {
    const spy = jest.spyOn(repository, 'findById');
    await updateLocal.execute(1, 1, {});
    expect(spy).toBeCalled();
  });

  test('should call throw an error if local not found', async () => {
    const call = async () => await updateLocal.execute(2, 1, {});
    await expect(call).rejects.toThrowError(ApplicationException);
  });

  test('should call update in updateLocal', async () => {
    const spy = jest.spyOn(repository, 'update');
    await updateLocal.execute(1, 1, {});
    expect(spy).toBeCalled();
  });
});
