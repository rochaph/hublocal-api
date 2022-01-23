import { Uf } from './Uf';

describe('Uf', () => {
  test('should create a new Uf', () => {
    const uf = new Uf('MS', 123);
    expect(uf).toBeDefined();
  });
});
