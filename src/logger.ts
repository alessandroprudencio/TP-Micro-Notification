import pino, { Logger } from 'pino';
import pretty from 'pino-pretty';

const logger: Logger = pino(
  { level: 'debug' },
  pretty({
    colorize: true,
    crlf: true,
    levelFirst: false,
    translateTime: 'SYS:-3 dd/mm/yyyy HH:MM:ss TT',
  }),
);

export default logger;
