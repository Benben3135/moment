// src/meditation/meditation.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeditationController } from './meditation.controller';
import { MeditationService } from './meditation.service';
import { MeditationSession, MeditationSessionSchema } from './schemas/session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MeditationSession.name, schema: MeditationSessionSchema },
    ]),
  ],
  controllers: [MeditationController],
  providers: [MeditationService],
})
export class MeditationModule {}