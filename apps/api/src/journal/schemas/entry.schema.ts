// src/journal/schemas/entry.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JournalEntryDocument = JournalEntry & Document;

@Schema({ timestamps: true })
export class JournalEntry {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: Object })
  metadata: {
    mood: string;
    energyLevel: number;
    location?: string;
  };
}

export const JournalEntrySchema = SchemaFactory.createForClass(JournalEntry);