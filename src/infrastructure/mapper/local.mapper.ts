import Local from '../../domain/local/Local';
import { Mapper } from './mapper';

type Entity = Omit<Local, 'id'> & {
  id: number;
};

export class LocalMapper implements Mapper<Local> {
  public map({
    nome,
    endereco,
    empresaId,
    responsavelId,
    responsavelPrincipal,
    empresa,
    responsaveis,
    id,
  }: Entity): Local {
    return new Local(
      nome,
      endereco,
      empresaId,
      responsavelId,
      responsavelPrincipal,
      empresa,
      responsaveis,
      id,
    );
  }

  public mapAll(entities: Entity[]): Local[] {
    const mappedLocaiss = entities.map(
      ({
        nome,
        endereco,
        empresaId,
        responsavelId,
        responsavelPrincipal,
        empresa,
        responsaveis,
        id,
      }) => {
        return new Local(
          nome,
          endereco,
          empresaId,
          responsavelId,
          responsavelPrincipal,
          empresa,
          responsaveis,
          id,
        );
      },
    );

    return mappedLocaiss;
  }
}
