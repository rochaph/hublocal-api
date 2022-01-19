import Factory from './Factory';
import * as bcrypt from 'bcrypt';

export class HashFactory implements Factory<string> {
  public async create(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(senha, salt);
  }
}
