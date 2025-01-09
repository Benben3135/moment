import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface NotificationPreferences {
  email?: boolean;
  push?: boolean;
  reminders?: boolean;
}

export interface MeditationReminders {
  enabled: boolean;
  time?: string;
  days?: string[];
}

export interface UserPreferences {
  theme?: 'light' | 'dark';
  language?: string;
  notificationPreferences?: NotificationPreferences;
  meditationDuration?: number;
  meditationReminders?: MeditationReminders;
}

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  }
})
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  clerkId: string;

  @Prop({ required: false })
  email?: string;

  @Prop({ required: false })
  firstName?: string;

  @Prop({ required: false })
  lastName?: string;

  @Prop({ required: false })
  bio?: string;

  @Prop({ required: false, unique: true, sparse: true })
  username?: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ type: [String], default: [] })
  interests: string[];

  @Prop({ 
    type: Object, 
    default: () => ({
      theme: 'light',
      language: 'en',
      notificationPreferences: {
        email: false,
        push: false,
        reminders: false
      },
      meditationDuration: 10,
      meditationReminders: {
        enabled: false,
        time: '09:00',
        days: ['monday', 'wednesday', 'friday']
      }
    })
  })
  preferences: UserPreferences;

  @Prop({ default: false })
  isProfileComplete: boolean;

  @Prop({ default: Date.now })
  lastLoginAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);