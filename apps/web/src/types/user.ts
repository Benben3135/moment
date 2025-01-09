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
  
  export interface User {
    id?: string;
    clerkId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    username?: string;
    avatarUrl?: string;
    interests: string[];
    preferences: UserPreferences;
    isProfileComplete: boolean;
    lastLoginAt: Date;
  }