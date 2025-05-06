import { Application } from 'express';

import healthcheck from './modules/healthcheck';
import user from './modules/User';
// import authLocal from './modules/auth/local';

function routes(app: Application) {
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/users', user);

//   app.use('/auth/local', authLocal);
}

export default routes;