import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MeditationSessionDocument = MeditationSession & Document;

@Schema({ timestamps: true })
export class MeditationSession {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  type: string;

  @Prop()
  notes?: string;

  @Prop({ type: Object })
  metrics: {
    focusScore?: number;
    calmScore?: number;
    completion: boolean;
  };
}

export const MeditationSessionSchema = SchemaFactory.createForClass(MeditationSession);