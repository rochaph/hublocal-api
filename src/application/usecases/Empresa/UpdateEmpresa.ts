import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../exceptions/ApplicationException';
import { EmpresaRepository } from '../../ports/EmpresaRepository';
import Empresa from '../../../domain/empresa/Empresa';
import { validateNotEmpty } from '../../shared/Validations';

type UpdateEmpresaParams = Partial<
  Pick<Empresa, 'nome' | 'cnpj' | 'descricao'>
> & {
  responsavelId?: number;
};

@Injectable()
export class UpdateEmpresa {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async execute(usuarioId: number, id: number, data: UpdateEmpresaParams) {
    const empresa = await this.empresaRepository.findById(usuarioId, id);

    if (!empresa) throw new ApplicationException('Not found');

    this.validateEmpresa(data);
    await this.empresaRepository.update(id, data);
  }

  private validateEmpresa(empresa: UpdateEmpresaParams) {
    if (empresa.nome) {
      validateNotEmpty(empresa.nome, 'empresa nome');
    }
    if (empresa.descricao) {
      validateNotEmpty(empresa.descricao, 'empresa descricao');
    }

    if (empresa.cnpj && empresa.cnpj.toString().length !== 14) {
      throw new ApplicationException('should have 14 digits');
    }

    if (empresa.responsavelId && empresa.responsavelId <= 0) {
      throw new ApplicationException('responsavel is not valid');
    }
  }
}
