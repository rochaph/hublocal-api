import Empresa from '../../empresa/entity/Empresa';
import Local from '../../local/entity/Local';
import Entity from '../../interface/Entity';

export default class Responsavel extends Entity {
  public nome: string;
  public telefone: number;
  public empresas?: Empresa[];
  public locais?: Local[];

  constructor(
    nome: string,
    telefone: number,
    id?: number,
    empresas?: Empresa[],
    locais?: Local[],
  ) {
    super();
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.empresas = empresas;
    this.locais = locais;
  }

  equals(entity: Entity): boolean {
    if (!(entity instanceof Responsavel)) return false;

    return this.id === entity.id;
  }
}
