import { EmpresaFactory } from './EmpresaFactory';
import Empresa from '../../domain/empresa/Empresa';
import { ApplicationException } from '../exceptions/ApplicationException';

const validParams = {
  nome: 'Teste',
  cnpj: '12345678910111',
  descricao: 'Teste',
};

describe('EmpresaFactory', () => {
  test('should create a new Empresa', () => {
    const empresa = new EmpresaFactory().create(validParams);
    expect(empresa).toBeInstanceOf(Empresa);
  });
  test('should throw an error for empty name', () => {
    const call = () =>
      new EmpresaFactory().create({
        ...validParams,
        nome: '',
      });
    expect(call).toThrowError(ApplicationException);
  });

  test('should throw an error for cnpj with less than 14 digits', () => {
    const call = () =>
      new EmpresaFactory().create({
        ...validParams,
        cnpj: '1231231231231',
      });
    expect(call).toThrowError(ApplicationException);
  });

  test('should throw an error for cnpj with more than 14 digits', () => {
    const call = () =>
      new EmpresaFactory().create({
        ...validParams,
        cnpj: '123123123123111',
      });
    expect(call).toThrowError(ApplicationException);
  });

  test('should throw an error for empty descricao', () => {
    const call = () =>
      new EmpresaFactory().create({
        ...validParams,
        descricao: '',
      });
    expect(call).toThrowError(ApplicationException);
  });
});
