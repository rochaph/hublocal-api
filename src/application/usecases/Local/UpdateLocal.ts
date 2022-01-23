import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../exceptions/ApplicationException';
import Local from '../../../domain/local/Local';
import { LocalRepository } from '../../ports/LocalRepository';
import { EnderecoFactory } from '../../factories/EnderecoFactory';
import { EnderecoWithUfString } from '../../ports/Endereco';

@Injectable()
export class UpdateLocal {
  constructor(private readonly localRepository: LocalRepository) {}

  async execute(
    usuarioId: number,
    id: number,
    data: Partial<
      Pick<Local, 'nome' | 'responsavelId'> & {
        endereco?: EnderecoWithUfString;
      }
    >,
  ) {
    const local = await this.localRepository.findById(usuarioId, id);
    if (!local) throw new ApplicationException('Not found');
    let endereco = undefined;

    if (data.endereco) {
      endereco = new EnderecoFactory().create(data.endereco);
    }
    await this.localRepository.update(id, {
      ...data,
      endereco,
    });
  }
}
