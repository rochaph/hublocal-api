export class Uf {
  public sigla: string;
  readonly id?: number;

  constructor(sigla: string, id?: number) {
    this.sigla = sigla;
    this.id = id;
  }
}
