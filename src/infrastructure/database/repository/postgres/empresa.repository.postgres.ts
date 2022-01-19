import { PrismaClient } from '@prisma/client';
import { EmpresaRepository } from '../../../../application/ports/EmpresaRepository';
import { EmpresaMapper } from '../../../mapper/empresa.mapper';
import Responsavel from '../../../../domain/responsavel/Responsavel';
import Endereco from '../../../../domain/endereco/Endereco';
import Local from '../../../../domain/local/Local';
import { ApplicationException } from '../../../../application/exceptions/ApplicationException';

export class EmpresaRepositoryPostgres implements EmpresaRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async findAll() {
    const empresas = await this.client.empresa.findMany({
      include: {
        responsaveis: { include: { endereco: true } },
        locais: { include: { endereco: true } },
      },
    });
    return new EmpresaMapper().mapAll(empresas);
  }

  async findById(id: number) {
    const empresa = await this.client.empresa.findUnique({
      where: { id },
      include: { responsaveis: true, locais: { include: { endereco: true } } },
    });
    if (!empresa) return null;
    return new EmpresaMapper().map(empresa);
  }

  async create(data: {
    nome: string;
    cnpj: bigint;
    descricao: string;
    usuario: { id: number };
    responsaveis: (Pick<Responsavel, 'nome' | 'telefone' | 'principal'> & {
      endereco: Omit<Endereco, 'id'>;
    })[];
    locais: (Pick<Local, 'nome'> & {
      endereco: Omit<Endereco, 'id'>;
    })[];
  }) {
    const {
      usuario: { id },
      responsaveis,
      locais,
      ...empresa
    } = data;
    await this.client.$transaction(async (prisma) => {
      const { id: empresaId } = await prisma.empresa.create({
        data: {
          ...empresa,
          usuario: { connect: { id } },
        },
      });

      for (const responsavel of responsaveis) {
        await prisma.responsavel.create({
          data: {
            ...responsavel,
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
      }

      const responsavelPrincipal = await prisma.responsavel.findFirst({
        where: { principal: true, empresaId },
      });

      for (const local of locais) {
        await prisma.local.create({
          data: {
            ...local,
            responsavelPrincipal: {
              connect: {
                id: responsavelPrincipal.id,
              },
            },
            empresa: {
              connect: {
                id: empresaId,
              },
            },
            endereco: {
              create: {
                ...local.endereco,
                uf: { connect: { sigla: local.endereco.uf.sigla } },
              },
            },
          },
        });
      }
    });
  }

  async update(
    id: number,
    data: {
      nome?: string;
      cnpj?: bigint;
      descricao?: string;
      responsavelId?: number;
    },
  ) {
    await this.client.$transaction(async (prisma) => {
      const { responsavelId, ...empresa } = data;
      if (responsavelId) {
        const responsavel = await prisma.responsavel.findFirst({
          where: { id: responsavelId, empresaId: id },
        });

        if (!responsavel)
          throw new ApplicationException('responsavel not found');

        await prisma.responsavel.update({
          where: { id: responsavelId },
          data: { empresa: { connect: { id } } },
        });
      }

      await prisma.empresa.update({ where: { id }, data: empresa });
    });
  }

  async delete(id: number) {
    await this.client.empresa.delete({ where: { id } });
  }
}
