import Responsavel from './Responsavel';

describe('Responsavel', () => {
  test('should create an new Responsavel', () => {
    const responsavel = new Responsavel('Teste', 337369264);
    expect(responsavel).toBeDefined();
  });
});
