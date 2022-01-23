import Factory from './Factory';
import Endereco from '../../domain/endereco/Endereco';
import { ApplicationException } from '../exceptions/ApplicationException';
import { UFS } from '../enums/UfEnum';
import { Uf } from '../../domain/uf/Uf';
import { EnderecoWithUfString } from '../ports/Endereco';
import { validateNotEmpty } from '../shared/Validations';

export class EnderecoFactory
  implements Factory<Endereco | EnderecoWithUfString>
{
  create({
    cep,
    rua,
    bairro,
    numero,
    cidade,
    uf,
  }: EnderecoWithUfString): Endereco {
    this.validateCep(cep);
    this.validateNumero(numero);
    validateNotEmpty(rua, 'endereco rua');
    validateNotEmpty(bairro, 'endereco bairro');
    validateNotEmpty(cidade, 'endereco cidade');
    this.validateUf(uf);
    return new Endereco(cep, rua, bairro, numero, cidade, new Uf(uf));
  }

  validateCep(cep: string) {
    if (cep.match(new RegExp('^[0-9]+$')) && cep.length !== 8) {
      throw new ApplicationException(
        'endereco cep length should have 8 characters.',
      );
    }
  }

  validateNumero(numero: number) {
    if (numero < 1) {
      throw new ApplicationException(
        'endereco numero should be greater than zero.',
      );
    }
  }

  validateUf(sigla: string) {
    let validUf = false;
    for (const uf in UFS) {
      if (sigla === uf) {
        validUf = true;
      }
    }
    if (!validUf) throw new ApplicationException('endereco uf is not valid.');
  }
}
