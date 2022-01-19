import Factory from './Factory';
import { ApplicationException } from '../exceptions/ApplicationException';
import { validateNotEmpty } from './Validations';
import Responsavel from '../../domain/responsavel/Responsavel';
import { EnderecoWithUfString } from '../ports/Endereco';
import { EnderecoFactory } from './EnderecoFactory';

type ResponsavelFactoryParams = Omit<Responsavel, 'endereco'> & {
  endereco: EnderecoWithUfString;
};

export class ResponsavelFactory implements Factory<Responsavel> {
  create({
    nome,
    telefone,
    principal,
    endereco,
  }: ResponsavelFactoryParams): Responsavel {
    validateNotEmpty(nome, 'responsavel nome');
    this.validateTelefone(telefone);
    const enderecoEntity = new EnderecoFactory().create(endereco);
    return new Responsavel(nome, telefone, principal, enderecoEntity);
  }

  validateTelefone(telefone: bigint) {
    if (telefone.toString().length !== 11) {
      throw new ApplicationException(
        'responsavel telefone should have 11 digits.',
      );
    }
  }
}
