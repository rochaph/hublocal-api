import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../exceptions/ApplicationException';
import { LocalRepository } from '../../ports/LocalRepository';

@Injectable()
export class GetLocal {
  constructor(private readonly localRepository: LocalRepository) {}

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
      const total = await this.localRepository.countByUsuario(usuarioId);
      const locais = await this.localRepository.findAll(usuarioId, page, limit);
      return { locais, total };
    }
    const local = await this.localRepository.findById(usuarioId, id);
    if (!local) throw new ApplicationException('Not found');
    return local;
  }
}
