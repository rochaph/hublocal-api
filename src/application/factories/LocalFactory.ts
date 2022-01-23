import Factory from './Factory';
import Local from '../../domain/local/Local';
import { EnderecoFactory } from './EnderecoFactory';
import { EnderecoWithUfString } from '../ports/Endereco';
import { validateNotEmpty } from '../shared/Validations';

export class LocalFactory implements Factory<Local> {
  create({ nome, endereco }: { nome: string; endereco: EnderecoWithUfString }) {
    validateNotEmpty(nome, 'local nome');
    const enderecoEntity = new EnderecoFactory().create(endereco);
    return new Local(nome, enderecoEntity);
  }
}
