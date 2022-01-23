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

  async findAll(usuarioId: number, page?: number, limit?: number) {
    const take = limit && limit > 0 ? limit : 10;
    const skip = limit && page && page > 0 ? (page - 1) * limit : 0;

    const local = await this.client.local.findMany({
      where: { empresa: { usuarioId } },
      include: {
        empresa: true,
        endereco: { include: { uf: true } },
        resposaveis: true,
        responsavelPrincipal: true,
      },
      skip,
      take,
      orderBy: { nome: 'asc' },
    });

    return new LocalMapper().mapAll(local);
  }

  async findById(usuarioId: number, id: number) {
    const local = await this.client.local.findFirst({
      where: { id, AND: { empresa: { usuarioId } } },
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

  async countByUsuario(usuarioId: number) {
    const count = await this.client.local.count({
      where: { empresa: { usuarioId } },
    });

    return count;
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
    await this.client.$transaction(async (prisma: PrismaClient) => {
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
    await this.client.$transaction(async (prisma: PrismaClient) => {
      let responsavelPrincipal = undefined;
      let enderecoUpdate = undefined;

      if (responsavelId) {
        const oldLocal = await prisma.local.findUnique({
          where: { id },
        });

        const responsavel = await prisma.responsavel.findFirst({
          where: { id: responsavelId, AND: { empresaId: oldLocal.empresaId } },
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
