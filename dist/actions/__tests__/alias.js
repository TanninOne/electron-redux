

const _alias = require('../alias');

jest.unmock('../alias');
describe('alias', () => {
  it('should return the ALIASED action type', () => {
    expect(_alias.ALIASED).toBe('ALIASED');
  });
});
