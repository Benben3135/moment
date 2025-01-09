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