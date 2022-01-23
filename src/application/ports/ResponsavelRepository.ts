import Responsavel from '../../domain/responsavel/Responsavel';

export abstract class ResponsavelRepository {
  abstract findAllByEmpresa(empresaId: number): Promise<Responsavel[]>;
}
