import { EnderecoFactory } from './EnderecoFactory';
import Endereco from '../../domain/endereco/Endereco';
import { ApplicationException } from '../exceptions/ApplicationException';

const validParams = {
  cep: '12295600',
  rua: 'teste',
  bairro: 'teste',
  numero: 1,
  cidade: 'teste',
  uf: 'MS',
};

describe('EnderecoFactory', () => {
  test('should create a new Endereco', () => {
    const endereco = new EnderecoFactory().create(validParams);
    expect(endereco).toBeInstanceOf(Endereco);
  });
  test('should throw an error for cep with less than 8 digits', () => {
    const call = () =>
      new EnderecoFactory().create({
        ...validParams,
        cep: '1229560',
      });
    expect(call).toThrowError(ApplicationException);
  });

  test('should throw an error for empty rua', () => {
    const call = () =>
      new EnderecoFactory().create({
        ...validParams,
        rua: '',
      });
    expect(call).toThrowError(ApplicationException);
  });
  test('should throw an error for numero equals zero', () => {
    const call = () =>
      new EnderecoFactory().create({
        ...validParams,
        numero: 0,
      });
    expect(call).toThrowError(ApplicationException);
  });
  test('should throw an error for numero less than zero', () => {
    const call = () =>
      new EnderecoFactory().create({
        ...validParams,
        numero: -1,
      });
    expect(call).toThrowError(ApplicationException);
  });
  test('should throw an error for empty cidade', () => {
    const call = () =>
      new EnderecoFactory().create({
        ...validParams,
        cidade: '',
      });
    expect(call).toThrowError(ApplicationException);
  });
  test('should throw an error for empty uf', () => {
    const call = () =>
      new EnderecoFactory().create({
        ...validParams,
        uf: '',
      });
    expect(call).toThrowError(ApplicationException);
  });
});
