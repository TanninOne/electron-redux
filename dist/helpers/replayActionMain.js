

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = replayActionMain;

const _electron = require('electron');

function replayActionMain(store) {
  /**
   * Give renderers a way to sync the current state of the store, but be sure
   * we don't expose any remote objects. In other words, we need our state to
   * be serializable.
   *
   * Refer to https://github.com/electron/electron/blob/master/docs/api/remote.md#remote-objects
   */
  global.getReduxState = function () {
    return JSON.stringify(store.getState());
  };

  _electron.ipcMain.on('redux-action', (event, payload) => {
    store.dispatch(payload);
  });
}
