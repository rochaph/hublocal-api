import Local from '../local/Local';
import Endereco from '../endereco/Endereco';

export default class Responsavel {
  public nome: string;
  public telefone: string;
  public principal?: boolean;
  public endereco?: Endereco;
  public empresaId?: number;
  public locais?: Local[];
  readonly id?: number;

  constructor(
    nome: string,
    telefone: string,
    principal?: boolean,
    endereco?: Endereco,
    empresaId?: number,
    locais?: Local[],
    id?: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
    this.principal = principal;
    this.empresaId = empresaId;
    this.locais = locais;
  }
}
