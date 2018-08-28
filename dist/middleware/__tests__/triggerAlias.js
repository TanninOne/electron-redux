

const _triggerAlias = _interopRequireDefault(require('../triggerAlias'));

const _alias = _interopRequireDefault(require('../../registry/alias'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

jest.unmock('../triggerAlias');
describe('triggerAlias', () => {
  it('should pass an action through if not ALIAS', () => {
    const next = jest.fn();
    const action = {
      type: 'SOMETHING',
    };
    (0, _triggerAlias.default)()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should trigger an alias action', () => {
    let _expect;

    const next = jest.fn();
    const payload = [123];
    const action = {
      type: 'MY_ACTION',
      payload: 'awesome',
    };
    const trigger = jest.fn(() => action);
    const aliasedAction = {
      type: 'ALIASED',
      payload,
      meta: {
        trigger: 'MY_ACTION',
      },
    };

    _alias.default.get.mockImplementation(() => trigger);

    (0, _triggerAlias.default)()(next)(aliasedAction);
    expect(trigger).toHaveBeenCalledTimes(1);

    (_expect = expect(trigger)).toHaveBeenCalledWith.apply(_expect, payload);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should trigger an alias action without payload', () => {
    const next = jest.fn();
    const action = {
      type: 'MY_ACTION',
      payload: 'awesome',
    };
    const trigger = jest.fn(() => action);
    const aliasedAction = {
      type: 'ALIASED',
      meta: {
        trigger: 'MY_ACTION',
      },
    };

    _alias.default.get.mockImplementation(() => trigger);

    (0, _triggerAlias.default)()(next)(aliasedAction);
    expect(trigger).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should throw an error when no meta defined', () => {
    const next = jest.fn();
    const payload = [123];
    const action = {
      type: 'MY_ACTION',
      payload: 'awesome',
    };
    const trigger = jest.fn(() => action);
    const aliasedAction = {
      type: 'ALIASED',
      payload,
    };

    _alias.default.get.mockImplementation(() => trigger);

    expect(() => {
      (0, _triggerAlias.default)()(next)(aliasedAction);
    }).toThrowError('No trigger defined');
  });
  it('should throw an error when no trigger defined', () => {
    const next = jest.fn();
    const payload = [123];
    const action = {
      type: 'MY_ACTION',
      payload: 'awesome',
    };
    const trigger = jest.fn(() => action);
    const aliasedAction = {
      type: 'ALIASED',
      payload,
      meta: {},
    };

    _alias.default.get.mockImplementation(() => trigger);

    expect(() => {
      (0, _triggerAlias.default)()(next)(aliasedAction);
    }).toThrowError('No trigger defined');
  });
  it('should throw an error when trigger alias not defined', () => {
    const next = jest.fn();
    const payload = [123];
    const aliasedAction = {
      type: 'ALIASED',
      payload,
      meta: {
        trigger: 'MY_OTHER_ACTION',
      },
    };

    _alias.default.get.mockImplementation(() => undefined);

    expect(() => {
      (0, _triggerAlias.default)()(next)(aliasedAction);
    }).toThrowError('Trigger alias MY_OTHER_ACTION not found');
  });
});
