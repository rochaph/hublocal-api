import { Injectable } from '@nestjs/common';
import { EmpresaRepository } from '../../ports/EmpresaRepository';
import { ApplicationException } from '../../exceptions/ApplicationException';

@Injectable()
export class DeleteEmpresa {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async execute(usuarioId: number, id: number) {
    const empresa = await this.empresaRepository.findById(usuarioId, id);
    if (!empresa) throw new ApplicationException('Not found');

    await this.empresaRepository.delete(id);
  }
}
