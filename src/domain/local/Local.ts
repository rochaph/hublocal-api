import Responsavel from '../responsavel/Responsavel';
import Empresa from '../empresa/Empresa';
import Endereco from '../endereco/Endereco';

export default class Local {
  public nome: string;
  public endereco: Endereco;
  public empresaId?: number;
  public responsavelId?: number;
  public responsavelPrincipal?: Responsavel;
  public empresa?: Empresa;
  public responsaveis?: Responsavel[];
  readonly id?: number;

  constructor(
    nome: string,
    endereco: Endereco,
    empresaId?: number,
    responsavelId?: number,
    responsavelPrincipal?: Responsavel,
    empresa?: Empresa,
    responsaveis?: Responsavel[],
    id?: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.empresaId = empresaId;
    this.responsavelId = responsavelId;
    this.responsavelPrincipal = responsavelPrincipal;
    this.empresa = empresa;
    this.responsaveis = responsaveis;
  }
}
