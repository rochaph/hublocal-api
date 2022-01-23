import Endereco from './Endereco';

describe('Endereco', () => {
  test('should create a new Endereco', () => {
    const endereco = new Endereco('79097210', '', '', 300, '');
    expect(endereco).toBeDefined();
  });
});
