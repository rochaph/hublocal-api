import Responsavel from '../responsavel/Responsavel';
import Empresa from '../empresa/Empresa';
import Endereco from '../endereco/Endereco';

export default class Local {
  public nome: string;
  public endereco: Endereco;
  public empresa: Empresa;
  public responsaveis?: Responsavel[];
  readonly id?: number;

  constructor(
    nome: string,
    endereco: Endereco,
    empresa: Empresa,
    responsaveis?: Responsavel[],
    id?: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.empresa = empresa;
    this.responsaveis = responsaveis;
  }
}
