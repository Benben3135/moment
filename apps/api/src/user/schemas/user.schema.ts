// src/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  clerkId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, default: { notifications: true, theme: 'light' } })
  preferences: {
    notifications: boolean;
    theme: string;
  };

  @Prop({ default: Date.now })
  lastActive: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);