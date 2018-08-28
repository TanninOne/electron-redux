

const _alias = _interopRequireDefault(require('../alias'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

jest.unmock('../alias');
describe('alias', () => {
  describe('#set', () => {
    it('should set a value', () => {
      expect(() => {
        _alias.default.set('abc', 123);
      }).not.toThrow();
    });
  });
  describe('#get', () => {
    it('should get a value', () => {
      _alias.default.set('abc', 123);

      expect(_alias.default.get('abc')).toEqual(123);
    });
  });
});
