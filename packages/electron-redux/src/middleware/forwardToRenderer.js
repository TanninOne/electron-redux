import { webContents } from 'electron';
import validateAction from '../helpers/validateAction';

function skipTarget(contents) {
  if (contents.history.length === 0 || contents.history[0] === undefined) {
    return false;
  }
  return (
    contents.history[0].startsWith('chrome-extension://') ||
    contents.history[0].startsWith('devtools://')
  );
}

const forwardToRenderer = () => next => action => {
  if (!validateAction(action)) return next(action);
  if (action.meta && action.meta.scope === 'local') return next(action);

  const origin = action.meta ? action.meta.origin : undefined;

  // change scope to avoid endless-loop
  const rendererAction = JSON.stringify({
    ...action,
    meta: {
      ...action.meta,
      scope: 'local',
    },
  });

  const allWebContents = webContents.getAllWebContents();

  allWebContents.forEach(contents => {
    if ((origin === undefined || contents.id !== origin) && !skipTarget(contents)) {
      contents.send('redux-action', rendererAction);
    }
  });

  return next(action);
};

export default forwardToRenderer;
