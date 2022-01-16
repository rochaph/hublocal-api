import Responsavel from '../../responsavel/entity/Responsavel';
import Empresa from '../../empresa/entity/Empresa';
import Endereco from '../../endereco/entity/Endereco';
import Entity from '../../interface/Entity';

export default class Local extends Entity {
  public nome: string;
  public endereco?: Endereco;
  public empresas?: Empresa[];
  public responsaveis?: Responsavel[];

  constructor(
    nome: string,
    id?: number,
    endereco?: Endereco,
    empresas?: Empresa[],
    responsaveis?: Responsavel[],
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.empresas = empresas;
    this.responsaveis = responsaveis;
  }

  equals(entity: Entity): boolean {
    if (!(entity instanceof Local)) return false;

    return this.id === entity.id;
  }
}
