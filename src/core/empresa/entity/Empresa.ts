import Local from '../../local/entity/Local';
import Responsavel from '../../responsavel/entity/Responsavel';
import Entity from '../../interface/Entity';

export default class Empresa extends Entity {
  public nome: string;
  public cnpj: number;
  public descricao: string;
  public locais?: Local[];
  public responsaveis?: Responsavel[];

  constructor(
    nome: string,
    cnpj: number,
    descricao: string,
    id?: number,
    locais?: Local[],
    responsaveis?: Responsavel[],
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.cnpj = cnpj;
    this.descricao = descricao;
    this.locais = locais;
    this.responsaveis = responsaveis;
  }

  equals(entity: Entity): boolean {
    if (!(entity instanceof Empresa)) return false;

    return this.id === entity.id;
  }
}
