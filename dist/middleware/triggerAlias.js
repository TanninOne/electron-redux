

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _assert = _interopRequireDefault(require('assert'));

const _alias = require('../actions/alias');

const _alias2 = _interopRequireDefault(require('../registry/alias'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  return Array.from(arr);
}

const triggerAlias = function triggerAlias(store) {
  return function (next) {
    return function (action) {
      // TODO: store.dispatch() instead to not skip any middleware
      if (action.type === _alias.ALIASED) {
        (0, _assert.default)(action.meta && action.meta.trigger, 'No trigger defined');

        const alias = _alias2.default.get(action.meta.trigger);

        (0, _assert.default)(alias, 'Trigger alias '.concat(action.meta.trigger, ' not found'));
        const args = action.payload || []; // trigger alias

        action = alias(..._toConsumableArray(args));
      }

      return next(action);
    };
  };
};

const _default = triggerAlias;
exports.default = _default;
