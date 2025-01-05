// src/config/configuration.ts
export default () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    database: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/moment',
    },
    clerk: {
      secretKey: process.env.CLERK_SECRET_KEY,
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    },
  });
  
  // src/config/winston.config.ts
  import { WinstonModuleOptions } from 'nest-winston';
  import { format, transports } from 'winston';
  
  export const winstonConfig: WinstonModuleOptions = {
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.simple(),
        ),
      }),
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: format.combine(
          format.timestamp(),
          format.json(),
        ),
      }),
    ],
  };