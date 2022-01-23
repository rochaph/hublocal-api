import Empresa from './Empresa';

describe('Empresa', () => {
  test('should create a new Empresa', () => {
    const empresa = new Empresa('Teste', '123123', 'Teste');
    expect(empresa).toBeDefined();
  });
});
