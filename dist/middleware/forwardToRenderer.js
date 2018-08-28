

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _electron = require('electron');

const _validateAction = _interopRequireDefault(require('../helpers/validateAction'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (let i = 1; i < arguments.length; i++) {
        const source = arguments[i];
        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

const forwardToRenderer = function forwardToRenderer() {
  return function (next) {
    return function (action) {
      if (!(0, _validateAction.default)(action)) return next(action);
      if (action.meta && action.meta.scope === 'local') return next(action);
      const origin = action.meta ? action.meta.origin : undefined; // change scope to avoid endless-loop

      const rendererAction = _extends({}, action, {
        meta: _extends({}, action.meta, {
          scope: 'local',
        }),
      });

      const allWebContents = _electron.webContents.getAllWebContents();

      allWebContents.forEach((contents) => {
        if (origin === undefined || contents.id !== origin) {
          contents.send('redux-action', rendererAction);
        }
      });
      return next(action);
    };
  };
};

const _default = forwardToRenderer;
exports.default = _default;
