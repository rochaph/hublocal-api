import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../exceptions/ApplicationException';
import { EmpresaRepository } from '../../ports/EmpresaRepository';

@Injectable()
export class GetEmpresa {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async execute(id?: number) {
    if (!id) {
      return await this.empresaRepository.findAll();
    }
    const empresa = await this.empresaRepository.findById(id);
    if (!empresa) throw new ApplicationException('Not found');
    return empresa;
  }
}
