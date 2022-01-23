import {
  validateLength,
  validateNotEmpty,
  validatePrincipal,
} from './Validations';
import { ApplicationException } from '../exceptions/ApplicationException';

describe('Validations', () => {
  test('should throw an error if string is empty', async () => {
    const call = () => validateNotEmpty('', 'teste');
    expect(call).toThrowError(ApplicationException);
  });

  test('should pass if string is not empty', async () => {
    const call = () => validateNotEmpty('1', 'teste');
    expect(call).not.toThrowError(ApplicationException);
  });

  test('should throw an error if string has less digits than specified', async () => {
    const call = () => validateLength('123', 'teste', 4);
    expect(call).toThrowError(ApplicationException);
  });

  test('should pass if string length is equal than specified', async () => {
    const call = () => validateLength('1', 'teste', 1);
    expect(call).not.toThrowError(ApplicationException);
  });

  test('should pass if string length is greater than specified', async () => {
    const call = () => validateLength('1', 'teste', 1);
    expect(call).not.toThrowError(ApplicationException);
  });

  test('should pass if passed array has length equals 1', async () => {
    const call = () => validatePrincipal([1], 'teste');
    expect(call).not.toThrowError(ApplicationException);
  });

  test('should throw an error if passed array has length greater 1', async () => {
    const call = () => validatePrincipal([1, 2], 'teste');
    expect(call).toThrowError(ApplicationException);
  });

  test('should throw an error if passed array has length equals zero', async () => {
    const call = () => validatePrincipal([], 'teste');
    expect(call).toThrowError(ApplicationException);
  });
});
