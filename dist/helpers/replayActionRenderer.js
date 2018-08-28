

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = replayActionRenderer;

const _electron = require('electron');

function replayActionRenderer(store) {
  _electron.ipcRenderer.on('redux-action', (event, payload) => {
    store.dispatch(payload);
  });
}
