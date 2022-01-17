import { Mapper } from './Mapper';
import Local from '../../domain/local/Local';

type Entity = Local & { id: number };

export class LocalMapper implements Mapper<Local> {
  public map({ nome, endereco, empresa, responsaveis, id }: Entity): Local {
    return new Local(nome, endereco, empresa, responsaveis, id);
  }

  public mapAll(entities: Entity[]): Local[] {
    const mappedLocaiss = entities.map(
      ({ nome, endereco, empresa, responsaveis, id }) =>
        new Local(nome, endereco, empresa, responsaveis, id),
    );

    return mappedLocaiss;
  }
}
