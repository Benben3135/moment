import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhooksModule } from './webhooks/webhooks.module';
import { UsersModule } from './user/user.module';
import { JournalModule } from './journal/journal.module';
import { MeditationModule } from './meditation/meditation.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    WebhooksModule,
    UsersModule,
    JournalModule,
    MeditationModule,
    HttpModule,
    AuthModule,
    UsersModule,
    JwtModule.register({
      publicKey: process.env.CLERK_JWT_PUBLIC_KEY,
      verifyOptions: {
        algorithms: ['RS256'],
      },
    }),
  ],
})
export class AppModule {}