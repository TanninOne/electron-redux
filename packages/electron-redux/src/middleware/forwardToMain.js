import { ipcRenderer, remote } from 'electron';
import validateAction from '../helpers/validateAction';

let webContents;

// eslint-disable-next-line consistent-return, no-unused-vars
export const forwardToMainWithParams = (params = {}) => store => next => action => {
  const { blacklist = [] } = params;
  if (!validateAction(action)) return next(action);
  if (action.meta && action.meta.scope === 'local') return next(action);

  if (blacklist.some(rule => rule.test(action.type))) {
    return next(action);
  }

  if (
    action.type.substr(0, 2) !== '@@' &&
    action.type.substr(0, 10) !== 'redux-form' &&
    (!action.meta || !action.meta.scope || action.meta.scope !== 'local')
  ) {
    if (webContents === undefined) {
      webContents = remote.getCurrentWebContents();
    }
    if (webContents) {
      if (action.meta === undefined) {
        action.meta = {};
      }
      action.meta.origin = webContents.id;
    }

    ipcRenderer.send('redux-action', JSON.stringify(action));
  }

  return next(action);
};

const forwardToMain = forwardToMainWithParams({
  blacklist: [/^@@/, /^redux-form/],
});

export default forwardToMain;
