import Empresa from '../../domain/empresa/Empresa';
import { Mapper } from './mapper';

type Entity = Empresa & { id: number };

export class EmpresaMapper implements Mapper<Empresa> {
  public map({
    nome,
    cnpj,
    descricao,
    usuario,
    locais,
    responsaveis,
    id,
  }: Entity): Empresa {
    return new Empresa(
      nome,
      cnpj,
      descricao,
      usuario,
      locais,
      responsaveis,
      id,
    );
  }

  public mapAll(entities: Entity[]): Empresa[] {
    const mappedEmpresas = entities.map(
      ({ nome, cnpj, descricao, usuario, locais, responsaveis, id }) =>
        new Empresa(nome, cnpj, descricao, usuario, locais, responsaveis, id),
    );

    return mappedEmpresas;
  }
}
