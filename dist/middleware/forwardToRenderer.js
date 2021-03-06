'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _electron = require('electron');

var _validateAction = _interopRequireDefault(require('../helpers/validateAction'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function skipTarget(contents) {
  return (
    contents.getURL().startsWith('chrome-extension://') ||
    contents.getURL().startsWith('devtools://')
  );
}

var forwardToRenderer = function forwardToRenderer() {
  return function(next) {
    return function(action) {
      if (!(0, _validateAction.default)(action)) return next(action);
      if (action.meta && action.meta.scope === 'local') return next(action);
      var origin = action.meta ? action.meta.origin : undefined; // change scope to avoid endless-loop

      var rendererAction = JSON.stringify(
        _extends({}, action, {
          meta: _extends({}, action.meta, {
            scope: 'local',
          }),
        }),
      );

      var allWebContents = _electron.webContents.getAllWebContents();

      if (allWebContents !== undefined) {
        allWebContents.forEach(function(contents) {
          if ((origin === undefined || contents.id !== origin) && !skipTarget(contents)) {
            contents.send('redux-action', rendererAction);
          }
        });
      }

      return next(action);
    };
  };
};

var _default = forwardToRenderer;
exports.default = _default;
