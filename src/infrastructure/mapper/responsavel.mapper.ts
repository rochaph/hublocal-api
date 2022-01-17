import { Mapper } from './Mapper';
import Responsavel from '../../domain/responsavel/Responsavel';

type Entity = Responsavel & { id: number };

export class ResponsavelMapper implements Mapper<Responsavel> {
  public map({
    nome,
    telefone,
    endereco,
    empresas,
    locais,
    id,
  }: Entity): Responsavel {
    return new Responsavel(nome, telefone, endereco, empresas, locais, id);
  }

  public mapAll(entities: Entity[]): Responsavel[] {
    const mappedResponsaveis = entities.map(
      ({ nome, telefone, endereco, empresas, locais, id }) =>
        new Responsavel(nome, telefone, endereco, empresas, locais, id),
    );

    return mappedResponsaveis;
  }
}
