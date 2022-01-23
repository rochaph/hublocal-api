import Usuario from './Usuario';

describe('Usuario', () => {
  test('should create a new Usuario', () => {
    const usuario = new Usuario('teste', 'teste');
    expect(usuario).toBeDefined();
  });
});
