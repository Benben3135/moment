import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MeditationSession {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  duration: number;

  @Prop()
  notes?: string;

  @Prop()
  technique?: string;

  @Prop({ required: true })
  completedAt: Date;
}

export type MeditationSessionDocument = MeditationSession & Document;
export const MeditationSessionSchema = SchemaFactory.createForClass(MeditationSession);