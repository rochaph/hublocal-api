import Responsavel from './Responsavel';

describe('Responsavel', () => {
  test('should create a new Responsavel', () => {
    const responsavel = new Responsavel('Teste', '');
    expect(responsavel).toBeDefined();
  });
});
