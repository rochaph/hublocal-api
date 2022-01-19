import Factory from './Factory';
import { ApplicationException } from '../exceptions/ApplicationException';
import Empresa from '../../domain/empresa/Empresa';
import { validateNotEmpty } from './Validations';

export class EmpresaFactory implements Factory<Empresa> {
  create({
    nome,
    cnpj,
    descricao,
  }: {
    nome: string;
    cnpj: bigint;
    descricao: string;
  }) {
    validateNotEmpty(nome, 'empresa nome');
    validateNotEmpty(descricao, 'empresa descricao');
    this.validateCnpj(cnpj);
    return new Empresa(nome, cnpj, descricao);
  }

  validateCnpj(cnpj: bigint) {
    if (cnpj.toString().length !== 14) {
      throw new ApplicationException('empresa cnpj should have 14 digits.');
    }
  }
}
