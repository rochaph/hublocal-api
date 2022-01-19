import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../exceptions/ApplicationException';
import { LocalRepository } from '../../ports/LocalRepository';

@Injectable()
export class GetLocal {
  constructor(private readonly localRepository: LocalRepository) {}

  async execute(id?: number) {
    if (!id) {
      return await this.localRepository.findAll();
    }
    const local = await this.localRepository.findById(id);
    if (!local) throw new ApplicationException('Not found');
    return local;
  }
}
