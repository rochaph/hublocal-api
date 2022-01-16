import Empresa from '../../empresa/entity/Empresa';
import Entity from '../../interface/Entity';

export default class Usuario extends Entity {
  public empresas?: Empresa[];
  private login;
  private senha;

  constructor(login: string, senha: string, id?: number, empresas?: Empresa[]) {
    super();
    this.id = id;
    this.login = login;
    this.senha = senha;
    this.empresas = empresas;
  }

  equals(entity: Entity): boolean {
    if (!(entity instanceof Usuario)) return false;

    return this.id === entity.id;
  }
}
