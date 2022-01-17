import Local from './Local';
import Endereco from '../endereco/Endereco';
import Empresa from '../empresa/Empresa';
import Usuario from '../usuario/Usuario';

describe('Local', () => {
  test('should create an new Local', () => {
    const endereco = new Endereco(123, '', '', 1, '');
    const usuario = new Usuario('', '');
    const empresa = new Empresa('', 1, '', usuario);

    const local = new Local('teste', endereco, empresa);
    expect(local).toBeDefined();
  });
});
