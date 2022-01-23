import Local from '../local/Local';
import Responsavel from '../responsavel/Responsavel';
import Usuario from '../usuario/Usuario';

export default class Empresa {
  public nome: string;
  public cnpj: string;
  public descricao: string;
  public usuario?: Pick<Usuario, 'id'>;
  public locais?: Local[];
  public responsaveis?: Responsavel[];
  readonly id?: number;

  constructor(
    nome: string,
    cnpj: string,
    descricao: string,
    usuario?: Pick<Usuario, 'id'>,
    locais?: Local[],
    responsaveis?: Responsavel[],
    id?: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.cnpj = cnpj;
    this.descricao = descricao;
    this.usuario = usuario;
    this.locais = locais;
    this.responsaveis = responsaveis;
  }
}
