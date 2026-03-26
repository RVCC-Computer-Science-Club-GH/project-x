import winston from 'winston';

const logLevel = process.env.LOG_LEVEL || 'info';

/**
 * Winston logger instance configured for the application.
 * Outputs structured logs with timestamp, level, and context.
 */
export const logger: winston.Logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    process.env.NODE_ENV === 'production' ? winston.format.json() : winston.format.colorize(),
  ),
  defaultMeta: { service: 'pathster-server' },
  transports: [
    new winston.transports.Console({
      format:
        process.env.NODE_ENV === 'production'
          ? winston.format.json()
          : winston.format.printf(({ timestamp, level, message, ...meta }) => {
              const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
              const ts = String(timestamp);
              const lv = String(level);
              const msg = String(message);
              return `${ts} [${lv}] ${msg} ${metaStr}`;
            }),
    }),
    // Optionally add file transport in production
    ...(process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]
      : []),
  ],
});

/**
 * Child logger factory for creating contextual loggers.
 */
export const getLogger = (context: string): winston.Logger => logger.child({ context });
