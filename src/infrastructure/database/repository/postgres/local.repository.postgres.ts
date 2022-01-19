import { PrismaClient } from '@prisma/client';
import { LocalRepository } from '../../../../application/ports/LocalRepository';
import { LocalMapper } from '../../../mapper/local.mapper';
import Endereco from '../../../../domain/endereco/Endereco';
import { ApplicationException } from '../../../../application/exceptions/ApplicationException';
import Responsavel from '../../../../domain/responsavel/Responsavel';

export class LocalRepositoryPostgres implements LocalRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async findAll() {
    const local = await this.client.local.findMany({
      include: {
        empresa: true,
        endereco: { include: { uf: true } },
        resposaveis: true,
        responsavelPrincipal: true,
      },
    });

    return new LocalMapper().mapAll(local);
  }

  async findById(id: number) {
    const local = await this.client.local.findUnique({
      where: { id },
      include: {
        empresa: true,
        endereco: { include: { uf: true } },
        resposaveis: true,
        responsavelPrincipal: true,
      },
    });

    if (!local) return null;

    return new LocalMapper().map(local);
  }

  async create(data: {
    nome: string;
    empresaId: number;
    endereco: Omit<Endereco, 'id'>;
    responsaveis: (Pick<Responsavel, 'nome' | 'telefone'> & {
      principalLocal: boolean;
      endereco: Omit<Endereco, 'id'>;
    })[];
  }) {
    await this.client.$transaction(async (prisma) => {
      const { empresaId, endereco, responsaveis, ...local } = data;

      let responsavelId = 0;

      for (const responsavel of responsaveis) {
        const { principalLocal, ...data } = responsavel;
        const { id } = await prisma.responsavel.create({
          data: {
            ...data,
            principal: false,
            empresa: {
              connect: {
                id: empresaId,
              },
            },
            endereco: {
              create: {
                ...responsavel.endereco,
                uf: { connect: { sigla: responsavel.endereco.uf.sigla } },
              },
            },
          },
        });

        if (principalLocal) responsavelId = id;
      }

      await prisma.local.create({
        data: {
          ...local,
          endereco: {
            create: {
              ...endereco,
              uf: { connect: { sigla: endereco.uf.sigla } },
            },
          },
          empresa: { connect: { id: data.empresaId } },
          responsavelPrincipal: { connect: { id: responsavelId } },
        },
      });
    });
  }

  async update(
    id: number,
    {
      responsavelId,
      endereco,
      ...local
    }: {
      nome?: string;
      endereco?: Omit<Endereco, 'id'>;
      responsavelId?: number;
    },
  ) {
    await this.client.$transaction(async (prisma) => {
      let responsavelPrincipal = undefined;
      let enderecoUpdate = undefined;

      if (responsavelId) {
        const oldLocal = await prisma.local.findUnique({
          where: { id },
        });

        const responsavel = await prisma.responsavel.findFirst({
          where: { id: responsavelId, empresaId: oldLocal.empresaId },
        });

        if (!responsavel) {
          throw new ApplicationException('responsavel is not valid');
        }

        responsavelPrincipal = { update: { id: responsavelId } };
      }

      if (endereco) {
        enderecoUpdate = {
          update: {
            ...endereco,
            uf: { connect: { sigla: endereco.uf.sigla } },
          },
        };
      }

      await prisma.local.update({
        where: { id },
        data: {
          ...local,
          endereco: enderecoUpdate,
          responsavelPrincipal,
        },
      });
    });
  }

  async delete(id: number) {
    await this.client.local.delete({ where: { id } });
  }
}
