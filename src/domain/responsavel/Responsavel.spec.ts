import Responsavel from './Responsavel';
import Endereco from '../endereco/Endereco';

describe('Responsavel', () => {
  test('should create an new Responsavel', () => {
    const endereco = new Endereco(
      79097210,
      'Teste',
      'Teste',
      300,
      'Cidade',
      'MS',
    );
    const responsavel = new Responsavel('Teste', 337369264, endereco);
    expect(responsavel).toBeDefined();
  });
});
