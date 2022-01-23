import Local from './Local';
import Endereco from '../endereco/Endereco';

describe('Local', () => {
  test('should create a new Local', () => {
    const endereco = new Endereco('123', '', '', 1, '');
    const local = new Local('teste', endereco);
    expect(local).toBeDefined();
  });
});
