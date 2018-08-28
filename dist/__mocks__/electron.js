

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.remote = exports.ipcRenderer = exports.ipcMain = exports.webContents = exports.default = void 0;

const _default = jest.fn();

exports.default = _default;
const webContents = {
  getAllWebContents: jest.fn(() => []),
};
exports.webContents = webContents;
const ipcMain = {
  on: jest.fn(),
};
exports.ipcMain = ipcMain;
const ipcRenderer = {
  on: jest.fn(),
  send: jest.fn(),
};
exports.ipcRenderer = ipcRenderer;
const remote = {
  getGlobal: jest.fn(),
};
exports.remote = remote;
