

const _createAliasedAction = _interopRequireDefault(require('../createAliasedAction'));

const _alias = _interopRequireDefault(require('../../registry/alias'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

jest.unmock('../createAliasedAction');
describe('createAliasedAction', () => {
  it('should register the action in the registry', () => {
    const fn = jest.fn();
    (0, _createAliasedAction.default)('some', fn);
    expect(_alias.default.set).toHaveBeenCalledTimes(1);
    expect(_alias.default.set).toHaveBeenCalledWith('some', fn);
  });
  it('should return the aliased action', () => {
    const fn = jest.fn();
    const actionCreator = (0, _createAliasedAction.default)('some', fn);
    expect(actionCreator).toBeInstanceOf(Function);
    const action = actionCreator(1, 2);
    expect(action).toEqual({
      type: 'ALIASED',
      payload: [1, 2],
      meta: {
        trigger: 'some',
      },
    });
  });
});
