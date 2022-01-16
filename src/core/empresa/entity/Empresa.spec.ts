import Empresa from './Empresa';

describe('Empresa', () => {
  test('should create an new Empresa', () => {
    const empresa = new Empresa('Teste', 123, 'Teste');
    expect(empresa).toBeDefined();
  });
});
