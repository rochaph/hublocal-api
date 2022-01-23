import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../exceptions/ApplicationException';
import { EmpresaRepository } from '../../ports/EmpresaRepository';

@Injectable()
export class GetEmpresa {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async execute({
    usuarioId,
    id,
    page,
    limit,
  }: {
    usuarioId: number;
    id?: number;
    page?: number;
    limit?: number;
  }) {
    if (!id) {
      const total = await this.empresaRepository.countByUsuario(usuarioId);
      const empresas = await this.empresaRepository.findAll(
        usuarioId,
        page,
        limit,
      );
      return { empresas, total };
    }

    const empresa = await this.empresaRepository.findById(usuarioId, id);

    if (!empresa) throw new ApplicationException('Not found');

    return empresa;
  }
}
