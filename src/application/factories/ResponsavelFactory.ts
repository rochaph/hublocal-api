import Factory from './Factory';
import { ApplicationException } from '../exceptions/ApplicationException';
import Responsavel from '../../domain/responsavel/Responsavel';
import { EnderecoWithUfString } from '../ports/Endereco';
import { EnderecoFactory } from './EnderecoFactory';
import { validateNotEmpty } from '../shared/Validations';

type ResponsavelFactoryParams = Omit<Responsavel, 'endereco'> & {
  endereco: EnderecoWithUfString;
};

export class ResponsavelFactory implements Factory<Responsavel> {
  create({
    nome,
    telefone,
    empresaId,
    principal,
    endereco,
    locais,
  }: ResponsavelFactoryParams): Responsavel {
    validateNotEmpty(nome, 'responsavel nome');
    this.validateEmpresaId(empresaId);
    this.validateTelefone(telefone);
    const enderecoEntity = new EnderecoFactory().create(endereco);
    return new Responsavel(nome, telefone, principal, enderecoEntity);
  }

  validateEmpresaId(id?: number) {
    if (id !== undefined && id < 1) {
      throw new ApplicationException('empresaId should be greater than zero.');
    }
  }

  validateTelefone(telefone: string) {
    if (!!telefone.match(new RegExp('^[0-9]+$')) && telefone.length !== 11) {
      throw new ApplicationException(
        'responsavel telefone should have 11 digits.',
      );
    }
  }
}
