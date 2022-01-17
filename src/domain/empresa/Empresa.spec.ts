import Empresa from './Empresa';
import Usuario from '../usuario/Usuario';

describe('Empresa', () => {
  test('should create an new Empresa', () => {
    const usuario = new Usuario('teste', 'teste');
    const empresa = new Empresa('Teste', 123, 'Teste', usuario);
    expect(empresa).toBeDefined();
  });
});
