

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = validateAction;

const _fluxStandardAction = require('flux-standard-action');

const _debug = _interopRequireDefault(require('debug'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const log = (0, _debug.default)('electron-redux:validateAction');

function validateAction(action) {
  if (!(0, _fluxStandardAction.isFSA)(action)) {
    log('WARNING! Action not FSA-compliant', action);
    return false;
  }

  return true;
}
