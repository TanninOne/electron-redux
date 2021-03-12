import { webContents } from 'electron';
import validateAction from '../helpers/validateAction';

function skipTarget(contents) {
  return (
    contents.getURL().startsWith('chrome-extension://') ||
    contents.getURL().startsWith('devtools://')
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

  if (allWebContents !== undefined) {
    allWebContents.forEach(contents => {
      if ((origin === undefined || contents.id !== origin) && !skipTarget(contents)) {
        contents.send('redux-action', rendererAction);
      }
    });
  }

  return next(action);
};

export default forwardToRenderer;
