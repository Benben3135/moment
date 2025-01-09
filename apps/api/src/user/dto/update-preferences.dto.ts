// dto/update-preferences.dto.ts
import { IsOptional, IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class NotificationPreferencesDto {
  @IsOptional()
  @IsBoolean()
  email?: boolean;

  @IsOptional()
  @IsBoolean()
  push?: boolean;

  @IsOptional()
  @IsBoolean()
  reminders?: boolean;
}

export class MeditationRemindersDto {
  @IsBoolean()
  enabled: boolean;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  days?: string[];
}

export class UpdatePreferencesDto {
  @IsOptional()
  @IsString()
  theme?: 'light' | 'dark';

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  notificationPreferences?: NotificationPreferencesDto;

  @IsOptional()
  @IsNumber()
  meditationDuration?: number;

  @IsOptional()
  meditationReminders?: MeditationRemindersDto;
}