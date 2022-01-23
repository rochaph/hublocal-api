import { EnderecoFactory } from './EnderecoFactory';
import { ApplicationException } from '../exceptions/ApplicationException';
import { ResponsavelFactory } from './ResponsavelFactory';
import Responsavel from '../../domain/responsavel/Responsavel';

const validParams = {
  nome: 'teste',
  principal: false,
  empresaId: 1,
  telefone: '15500550000',
  endereco: {
    cep: '12295600',
    rua: 'teste',
    bairro: 'teste',
    numero: 1,
    cidade: 'teste',
    uf: 'MS',
  },
};

describe('ResponsavelFactory', () => {
  test('should create a new responsavel', async () => {
    const local = new ResponsavelFactory().create(validParams);

    expect(local).toBeInstanceOf(Responsavel);
  });

  test('should call EnderecoFactory create', async () => {
    const spy = jest.spyOn(EnderecoFactory.prototype, 'create');

    new ResponsavelFactory().create(validParams);

    expect(spy).toBeCalledWith({
      cep: '12295600',
      rua: 'teste',
      bairro: 'teste',
      numero: 1,
      cidade: 'teste',
      uf: 'MS',
    });
  });

  test('should throw an error if responsavel nome is empty', async () => {
    const call = () =>
      new ResponsavelFactory().create({ ...validParams, nome: '' });

    expect(call).toThrowError(ApplicationException);
  });

  test('should throw an error for empresaId equal zero', async () => {
    const call = () =>
      new ResponsavelFactory().create({ ...validParams, empresaId: 0 });

    expect(call).toThrowError(ApplicationException);
  });

  test('should throw an error for empresaId less than zero', async () => {
    const call = () =>
      new ResponsavelFactory().create({ ...validParams, empresaId: -1 });

    expect(call).toThrowError(ApplicationException);
  });

  test('should throw an error for telefone with less than 11 digits', async () => {
    const call = () =>
      new ResponsavelFactory().create({
        ...validParams,
        telefone: '1234567891',
      });

    expect(call).toThrowError(ApplicationException);
  });

  test('should throw an error for telefone with more than 11 digits', async () => {
    const call = () =>
      new ResponsavelFactory().create({
        ...validParams,
        telefone: '123456789112',
      });

    expect(call).toThrowError(ApplicationException);
  });
});
