import Local from './Local';

describe('Local', () => {
  test('should create an new Local', () => {
    const local = new Local('teste');
    expect(local).toBeDefined();
  });
});
