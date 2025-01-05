// src/app.module.ts
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import configuration from './config/configuration';
import { winstonConfig } from './config/winston.config';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserModule } from './user/user.module';
import { JournalModule } from './journal/journal.module';
import { MeditationModule } from './meditation/meditation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    WinstonModule.forRoot(winstonConfig),
    UserModule,
    JournalModule,
    MeditationModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/(.*)')
      .forRoutes('*');
  }
}