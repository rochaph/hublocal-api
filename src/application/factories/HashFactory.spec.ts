import { HashFactory } from './HashFactory';
import * as bcrypt from 'bcrypt';

describe('HashFactory', () => {
  test('should create a new Hash', async () => {
    const hash = await new HashFactory().create('teste');
    const comparation = await bcrypt.compare('teste', hash);
    expect(comparation).toBeTruthy();
  });
});
