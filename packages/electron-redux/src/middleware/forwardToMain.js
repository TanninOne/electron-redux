import { ipcRenderer, remote } from 'electron';
import validateAction from '../helpers/validateAction';

const forwardToMain = store => next => (action) => {
  // eslint-disable-line no-unused-vars
  if (!validateAction(action)) return next(action);

  if (
    action.type.substr(0, 2) !== '@@' &&
    action.type.substr(0, 10) !== 'redux-form' &&
    (!action.meta || !action.meta.scope || action.meta.scope !== 'local')
  ) {
    const contents = remote.getCurrentWebContents();
    if (contents) {
      if (action.meta === undefined) {
        action.meta = {};
      }
      action.meta.origin = contents.id;
    }

    ipcRenderer.send('redux-action', action);
  }

  // eslint-disable-next-line consistent-return
  return next(action);
};

export default forwardToMain;
