import Empresa from '../empresa/Empresa';

export default class Usuario {
  public empresas?: Empresa[];
  public login;
  public senha;
  readonly id?: number;

  constructor(login: string, senha: string, empresas?: Empresa[], id?: number) {
    this.id = id;
    this.login = login;
    this.senha = senha;
    this.empresas = empresas;
  }
}
