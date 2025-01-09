export interface User {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    preferences: {
      theme?: 'light' | 'dark';
      language?: string;
      notificationPreferences?: {
        email?: boolean;
        push?: boolean;
        reminders?: boolean;
      };
      meditationDuration?: number; // in minutes
      meditationReminders?: {
        enabled: boolean;
        time?: string; // HH:mm format
        days?: string[]; // ['monday', 'wednesday', etc.]
      };
    };
    isProfileComplete: boolean;
    lastLoginAt?: Date;
    // ... other fields
  }