import Empresa from '../empresa/Empresa';
import Local from '../local/Local';
import Endereco from '../endereco/Endereco';

export default class Responsavel {
  public nome: string;
  public telefone: number;
  public endereco: Endereco;
  public empresas?: Empresa[];
  public locais?: Local[];
  readonly id?: number;

  constructor(
    nome: string,
    telefone: number,
    endereco: Endereco,
    empresas?: Empresa[],
    locais?: Local[],
    id?: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.empresas = empresas;
    this.locais = locais;
  }
}
