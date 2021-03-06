import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../exceptions/ApplicationException';
import { LocalRepository } from '../../ports/LocalRepository';

@Injectable()
export class DeleteLocal {
  constructor(private readonly localRepository: LocalRepository) {}

  async execute(usuarioId: number, id: number) {
    const local = await this.localRepository.findById(usuarioId, id);
    if (!local) throw new ApplicationException('Not found');

    await this.localRepository.delete(id);
  }
}
