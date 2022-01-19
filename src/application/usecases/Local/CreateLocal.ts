import { BadRequestException, Injectable } from '@nestjs/common';
import { LocalRepository } from '../../ports/LocalRepository';
import { EnderecoWithUfString } from '../../ports/Endereco';
import { EmpresaRepository } from '../../ports/EmpresaRepository';
import { LocalFactory } from '../../factories/LocalFactory';
import { ResponsavelFactory } from '../../factories/ResponsavelFactory';
import { validatePrincipal } from '../../shared/validations';

@Injectable()
export class CreateLocal {
  constructor(
    private readonly localRepository: LocalRepository,
    private readonly empresaRepository: EmpresaRepository,
  ) {}

  async execute({
    nome,
    endereco,
    responsaveis,
    empresaId,
  }: {
    nome: string;
    endereco: EnderecoWithUfString;
    responsaveis: {
      nome: string;
      telefone: bigint;
      endereco: EnderecoWithUfString;
      principalLocal: boolean;
    }[];
    empresaId: number;
  }) {
    const empresa = await this.empresaRepository.findById(empresaId);

    if (!empresa) {
      throw new BadRequestException('empresa not exists');
    }
    const local = new LocalFactory().create({ nome, endereco });

    const entityResponsaveis = responsaveis.map(
      ({ principalLocal, ...data }) => {
        const entity = new ResponsavelFactory().create({
          ...data,
          principal: false,
        });
        return { ...entity, principalLocal };
      },
    );

    const principal = entityResponsaveis.filter(
      ({ principalLocal }) => principalLocal,
    );

    validatePrincipal(principal, 'local');

    await this.localRepository.create({
      ...local,
      responsaveis: entityResponsaveis,
      empresaId,
    });
  }
}
