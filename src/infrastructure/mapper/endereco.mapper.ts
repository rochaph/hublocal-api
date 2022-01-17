import { Mapper } from './Mapper';
import Endereco from '../../domain/endereco/Endereco';

type Entity = Endereco & { id: number };

export class EnderecoMapper implements Mapper<Endereco> {
  public map({ cep, rua, bairro, numero, cidade, uf, id }: Entity): Endereco {
    return new Endereco(cep, rua, bairro, numero, cidade, uf, id);
  }

  public mapAll(entities: Entity[]): Endereco[] {
    const mappedEnderecos = entities.map(
      ({ cep, rua, bairro, numero, cidade, uf, id }) =>
        new Endereco(cep, rua, bairro, numero, cidade, uf, id),
    );

    return mappedEnderecos;
  }
}
