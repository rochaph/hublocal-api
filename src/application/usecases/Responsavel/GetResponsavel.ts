import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../exceptions/ApplicationException';
import { EmpresaRepository } from '../../ports/EmpresaRepository';
import Responsavel from '../../../domain/responsavel/Responsavel';

@Injectable()
export class GetResponsavel {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async execute(usuarioId: number, idEmpresa: number): Promise<Responsavel[]> {
    const empresa = await this.empresaRepository.findById(usuarioId, idEmpresa);
    if (!empresa) throw new ApplicationException('Not found');
    return empresa.responsaveis;
  }
}
