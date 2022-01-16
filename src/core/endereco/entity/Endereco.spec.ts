import Endereco from './Endereco';

describe('Endereco', () => {
  test('should create an new Endereco', () => {
    const endereco = new Endereco(
      79097210,
      'Teste',
      'Teste',
      300,
      'Cidade',
      'MS',
    );
    expect(endereco).toBeDefined();
  });
});
