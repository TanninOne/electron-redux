

const _electron = require('electron');

const _getInitialStateRenderer = _interopRequireDefault(require('../getInitialStateRenderer'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

jest.unmock('../getInitialStateRenderer');
describe('getInitialStateRenderer', () => {
  it('should return the initial state', () => {
    const state = {
      foo: 456,
    };

    _electron.remote.getGlobal.mockImplementation(() => function () {
      return JSON.stringify(state);
    });

    expect((0, _getInitialStateRenderer.default)()).toEqual(state);
  });
});
