import { UsuarioFactory } from './UsuarioFactory';
import { HashFactory } from './HashFactory';
import { ApplicationException } from '../exceptions/ApplicationException';

const validParams = {
  senha: '12345678',
  login: '123456',
};

describe('UsuarioFactory', () => {
  test('should call HashFactory create for password', async () => {
    const spy = jest.spyOn(HashFactory.prototype, 'create');
    const usuario = new UsuarioFactory().create(validParams);
    expect(spy).toBeCalledWith(validParams.senha);
  });

  test('should thrown an error for login with less than 6 digits', async () => {
    const call = async () =>
      await new UsuarioFactory().create({
        ...validParams,
        login: '123456',
      });

    expect(call).rejects.toThrowError(ApplicationException);
  });

  test('should thrown an error for senha with less than 8 digits', async () => {
    const call = async () =>
      await new UsuarioFactory().create({
        ...validParams,
        senha: '1234567',
      });

    expect(call).rejects.toThrowError(ApplicationException);
  });
});
