import Endereco from './Endereco';
import Uf from '../uf/Uf';

describe('Endereco', () => {
  test('should create an new Endereco', () => {
    const endereco = new Endereco(79097210, '', '', 300, '', new Uf(''));
    expect(endereco).toBeDefined();
  });
});
