import { webContents } from 'electron';
import validateAction from '../helpers/validateAction';

const forwardToRenderer = () => next => action => {
  if (!validateAction(action)) return next(action);
  if (action.meta && action.meta.scope === 'local') return next(action);

  const origin = action.meta ? action.meta.origin : undefined;

  // change scope to avoid endless-loop
  const rendererAction = {
    ...action,
    meta: {
      ...action.meta,
      scope: 'local',
    },
  };

  const allWebContents = webContents.getAllWebContents();

  allWebContents.forEach(contents => {
    if (origin === undefined || contents.id !== origin) {
      contents.send('redux-action', JSON.stringify(rendererAction));
    }
  });

  return next(action);
};

export default forwardToRenderer;
