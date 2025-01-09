import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeditationController } from './meditation.controller';
import { MeditationService } from './meditation.service';
import { MeditationSession, MeditationSessionSchema } from './schemas/meditation-session.schema';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AuthModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MongooseModule.forFeature([
      { name: MeditationSession.name, schema: MeditationSessionSchema }
    ])
  ],
  controllers: [MeditationController],
  providers: [MeditationService],
  exports: [MeditationService]
})
export class MeditationModule {}