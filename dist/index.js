'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'forwardToMain', {
  enumerable: true,
  get: function get() {
    return _forwardToMain.default;
  },
});
Object.defineProperty(exports, 'forwardToMainWithParams', {
  enumerable: true,
  get: function get() {
    return _forwardToMain.forwardToMainWithParams;
  },
});
Object.defineProperty(exports, 'forwardToRenderer', {
  enumerable: true,
  get: function get() {
    return _forwardToRenderer.default;
  },
});
Object.defineProperty(exports, 'triggerAlias', {
  enumerable: true,
  get: function get() {
    return _triggerAlias.default;
  },
});
Object.defineProperty(exports, 'createAliasedAction', {
  enumerable: true,
  get: function get() {
    return _createAliasedAction.default;
  },
});
Object.defineProperty(exports, 'replayActionMain', {
  enumerable: true,
  get: function get() {
    return _replayActionMain.default;
  },
});
Object.defineProperty(exports, 'replayActionRenderer', {
  enumerable: true,
  get: function get() {
    return _replayActionRenderer.default;
  },
});
Object.defineProperty(exports, 'getInitialStateRenderer', {
  enumerable: true,
  get: function get() {
    return _getInitialStateRenderer.default;
  },
});

var _forwardToMain = _interopRequireWildcard(require('./middleware/forwardToMain'));

var _forwardToRenderer = _interopRequireDefault(require('./middleware/forwardToRenderer'));

var _triggerAlias = _interopRequireDefault(require('./middleware/triggerAlias'));

var _createAliasedAction = _interopRequireDefault(require('./helpers/createAliasedAction'));

var _replayActionMain = _interopRequireDefault(require('./helpers/replayActionMain'));

var _replayActionRenderer = _interopRequireDefault(require('./helpers/replayActionRenderer'));

var _getInitialStateRenderer = _interopRequireDefault(require('./helpers/getInitialStateRenderer'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
