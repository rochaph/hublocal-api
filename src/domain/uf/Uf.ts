export default class Uf {
  public sigla: string;
  readonly id?: number;

  constructor(sigla: string, id?: number) {
    this.id = id;
    this.sigla = sigla;
  }
}
