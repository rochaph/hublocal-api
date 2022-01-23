import { EnderecoFactory } from './EnderecoFactory';
import { LocalFactory } from './LocalFactory';
import Local from '../../domain/local/Local';
import { ApplicationException } from '../exceptions/ApplicationException';

const validParasm = {
  nome: 'teste',
  endereco: {
    cep: '12295600',
    rua: 'teste',
    bairro: 'teste',
    numero: 1,
    cidade: 'teste',
    uf: 'MS',
  },
};

describe('LocalFactory', () => {
  test('should create a new local', async () => {
    const local = new LocalFactory().create(validParasm);

    expect(local).toBeInstanceOf(Local);
  });

  test('should call EnderecoFactory create', async () => {
    const spy = jest.spyOn(EnderecoFactory.prototype, 'create');

    new LocalFactory().create(validParasm);

    expect(spy).toBeCalledWith({
      cep: '12295600',
      rua: 'teste',
      bairro: 'teste',
      numero: 1,
      cidade: 'teste',
      uf: 'MS',
    });
  });

  test('should throw an error if local nome is empty', async () => {
    const call = () => new LocalFactory().create({ ...validParasm, nome: '' });

    expect(call).toThrowError(ApplicationException);
  });
});
