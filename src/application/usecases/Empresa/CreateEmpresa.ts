import { Injectable } from '@nestjs/common';
import { EmpresaRepository } from '../../ports/EmpresaRepository';
import Responsavel from '../../../domain/responsavel/Responsavel';
import Local from '../../../domain/local/Local';
import { EmpresaFactory } from '../../factories/EmpresaFactory';
import { EnderecoWithUfString } from '../../ports/Endereco';
import { ResponsavelFactory } from '../../factories/ResponsavelFactory';
import { LocalFactory } from '../../factories/LocalFactory';
import { validatePrincipal } from '../../shared/Validations';
import Empresa from '../../../domain/empresa/Empresa';

@Injectable()
export class CreateEmpresa {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async execute({
    nome,
    cnpj,
    descricao,
    responsaveis,
    locais,
    usuarioId,
  }: Pick<Empresa, 'nome' | 'cnpj' | 'descricao'> & {
    usuarioId: number;
    responsaveis: (Pick<Responsavel, 'nome' | 'telefone' | 'principal'> & {
      endereco: EnderecoWithUfString;
    })[];
    locais: (Pick<Local, 'nome'> & { endereco: EnderecoWithUfString })[];
  }) {
    const empresa = new EmpresaFactory().create({ nome, cnpj, descricao });

    empresa.responsaveis = responsaveis.map((responsavel) =>
      new ResponsavelFactory().create(responsavel),
    );

    empresa.locais = locais.map((local) => new LocalFactory().create(local));

    const principal = empresa.responsaveis.filter(
      (responsavel) => responsavel.principal,
    );

    validatePrincipal(principal, 'empresa');

    await this.empresaRepository.create({
      ...empresa,
      usuario: { id: usuarioId },
    });
  }
}
