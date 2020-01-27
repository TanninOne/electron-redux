'use strict';

var _electron = require('electron');

var _forwardToMain = _interopRequireWildcard(require('../forwardToMain'));

var _validateAction = _interopRequireDefault(require('../../helpers/validateAction'));

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

jest.unmock('../forwardToMain');
describe('forwardToMain', function() {
  beforeEach(function() {
    _validateAction.default.mockReturnValue(true);
  });
  it("should pass an action through if it doesn't pass validation (FSA)", function() {
    var next = jest.fn(); // thunk action

    var action = function action() {};

    _validateAction.default.mockReturnValue(false);

    (0, _forwardToMain.default)()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should pass an action through if it starts with @@', function() {
    var next = jest.fn();
    var action = {
      type: '@@SOMETHING',
    };
    (0, _forwardToMain.default)()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should pass an action through if it starts with redux-form', function() {
    var next = jest.fn();
    var action = {
      type: 'redux-form',
    };
    (0, _forwardToMain.default)()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should pass an action through if the scope is local', function() {
    var next = jest.fn();
    var action = {
      type: 'MY_ACTION',
      meta: {
        scope: 'local',
      },
    };
    (0, _forwardToMain.default)()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should forward any actions to the main process', function() {
    var next = jest.fn();
    var action = {
      type: 'SOMETHING',
      meta: {
        some: 'meta',
      },
    };
    (0, _forwardToMain.default)()(next)(action);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledTimes(1);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledWith('redux-action', action);
    expect(next).toHaveBeenCalledTimes(0);
  });
});
describe('forwardToMainWithParams', function() {
  beforeEach(function() {
    jest.clearAllMocks();

    _validateAction.default.mockReturnValue(true);
  });
  it('should forward an action through if it starts with @@', function() {
    var next = jest.fn();
    var action = {
      type: '@@SOMETHING',
    };
    (0, _forwardToMain.forwardToMainWithParams)()()(next)(action);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledTimes(1);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledWith('redux-action', action);
    expect(next).toHaveBeenCalledTimes(0);
  });
  it('should forward an action through if it starts with redux-form', function() {
    var next = jest.fn();
    var action = {
      type: 'redux-form',
    };
    (0, _forwardToMain.forwardToMainWithParams)()()(next)(action);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledTimes(1);
    expect(_electron.ipcRenderer.send).toHaveBeenCalledWith('redux-action', action);
    expect(next).toHaveBeenCalledTimes(0);
  });
  it('should pass an action through if it is blacklisted', function() {
    var next = jest.fn();
    var action = {
      type: '@@SOMETHING',
    };
    (0, _forwardToMain.forwardToMainWithParams)({
      blacklist: [/^@@/],
    })()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
});
