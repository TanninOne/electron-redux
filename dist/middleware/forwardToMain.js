

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _electron = require('electron');

const _validateAction = _interopRequireDefault(require('../helpers/validateAction'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const forwardToMain = function forwardToMain(store) {
  return function (next) {
    return function (action) {
      // eslint-disable-line no-unused-vars
      if (!(0, _validateAction.default)(action)) return next(action);

      if (
        action.type.substr(0, 2) !== '@@' &&
        action.type.substr(0, 10) !== 'redux-form' &&
        (!action.meta || !action.meta.scope || action.meta.scope !== 'local')
      ) {
        const contents = _electron.remote.getCurrentWebContents();

        if (contents) {
          if (action.meta === undefined) {
            action.meta = {};
          }

          action.meta.origin = contents.id;
        }

        _electron.ipcRenderer.send('redux-action', action);
      } // eslint-disable-next-line consistent-return

      return next(action);
    };
  };
};

const _default = forwardToMain;
exports.default = _default;
