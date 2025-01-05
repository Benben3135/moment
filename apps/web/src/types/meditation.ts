export interface MeditationStats {
    totalSessions: number;
    totalMinutes: number;
  }
  
  // src/types/journal.ts
  export interface JournalEntry {
    _id: string;
    title: string;
    content: string;
    tags?: string[];
    metadata?: {
      mood: string;
      energyLevel: number;
      location?: string;
    };
    createdAt: string;
  }
  