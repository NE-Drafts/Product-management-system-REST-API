import pino from 'pino';
import config from '../config/default';

const logger = pino({
  level: config.nodeEnv === 'development' ? 'debug' : 'info',
  transport: config.nodeEnv === 'development' 
    ? { target: 'pino-pretty' } 
    : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    }
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`
});

export default logger;