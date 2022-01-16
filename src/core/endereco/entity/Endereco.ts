import Entity from '../../interface/Entity';

export default class Endereco extends Entity {
  public cep: number;
  public rua: string;
  public bairro: string;
  public numero: number;
  public cidade: string;
  public uf: string;

  constructor(
    cep: number,
    rua: string,
    bairro: string,
    numero: number,
    cidade: string,
    uf: string,
    id?: number,
  ) {
    super();
    this.id = id;
    this.cep = cep;
    this.rua = rua;
    this.bairro = bairro;
    this.numero = numero;
    this.cidade = cidade;
    this.uf = uf;
  }

  equals(entity: Entity): boolean {
    if (!(entity instanceof Endereco)) return false;

    return this.id === entity.id;
  }
}
