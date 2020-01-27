'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = exports.forwardToMainWithParams = void 0;

var _electron = require('electron');

var _validateAction = _interopRequireDefault(require('../helpers/validateAction'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var webContents; // eslint-disable-next-line consistent-return, no-unused-vars

var forwardToMainWithParams = function forwardToMainWithParams() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function(store) {
    return function(next) {
      return function(action) {
        var _params$blacklist = params.blacklist,
          blacklist = _params$blacklist === void 0 ? [] : _params$blacklist;
        if (!(0, _validateAction.default)(action)) return next(action);
        if (action.meta && action.meta.scope === 'local') return next(action);

        if (
          blacklist.some(function(rule) {
            return rule.test(action.type);
          })
        ) {
          return next(action);
        }

        if (
          action.type.substr(0, 2) !== '@@' &&
          action.type.substr(0, 10) !== 'redux-form' &&
          (!action.meta || !action.meta.scope || action.meta.scope !== 'local')
        ) {
          if (webContents === undefined) {
            webContents = _electron.remote.getCurrentWebContents();
          }

          if (webContents) {
            if (action.meta === undefined) {
              action.meta = {};
            }

            action.meta.origin = webContents.id;
          }

          _electron.ipcRenderer.send('redux-action', action);
        }
      };
    };
  };
};

exports.forwardToMainWithParams = forwardToMainWithParams;
var forwardToMain = forwardToMainWithParams({
  blacklist: [/^@@/, /^redux-form/],
});
var _default = forwardToMain;
exports.default = _default;
