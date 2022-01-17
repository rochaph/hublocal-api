import Uf from '../uf/Uf';

export default class Endereco {
  public cep: number;
  public rua: string;
  public bairro: string;
  public numero: number;
  public cidade: string;
  public uf: Uf;
  readonly id?: number;

  constructor(
    cep: number,
    rua: string,
    bairro: string,
    numero: number,
    cidade: string,
    uf: Uf,
    id?: number,
  ) {
    this.id = id;
    this.cep = cep;
    this.rua = rua;
    this.bairro = bairro;
    this.numero = numero;
    this.cidade = cidade;
    this.uf = uf;
  }
}
