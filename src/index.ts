/* eslint-disable import/first */
import * as dotenv from 'dotenv';

dotenv.config();

import { server } from './app';
import log from './logger';

function startServer() {
  const PORT = process.env.PORT as string || 8080;
  server.listen(PORT, () => {
      console.log("hello mate")
      log.info(`Server running 🤖🚀 at http://localhost:${PORT}`);
  });
}

setImmediate(startServer);

export default server;