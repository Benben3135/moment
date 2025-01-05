// frontend/src/app/dashboard/page.tsx
"use client"

import { useEffect, useState } from 'react';
import { useApi } from '@/lib/api/client';
import { MeditationStats } from '@/types/meditation';
import { JournalEntry } from '@/types/journal';

export default function DashboardPage() {
  const { getApiClient } = useApi();
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [meditationStats, setMeditationStats] = useState<MeditationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const api = await getApiClient();
        
        // Fetch journal entries
        const journalResponse = await api.journal.getAll();
        setJournalEntries(journalResponse.data);
        
        // Fetch meditation stats
        const statsResponse = await api.meditation.getStats();
        setMeditationStats(statsResponse.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Journey</h1>
      
      {/* Meditation Stats */}
      {meditationStats && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Meditation Progress</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Total Sessions</p>
              <p className="text-2xl font-bold">{meditationStats.totalSessions}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Total Minutes</p>
              <p className="text-2xl font-bold">{meditationStats.totalMinutes}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Journal Entries */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Journal</h2>
        {journalEntries.length === 0 ? (
          <p className="text-muted-foreground">No journal entries yet. Start writing!</p>
        ) : (
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <div key={entry._id} className="p-4 border rounded-lg">
                <h3 className="font-medium">{entry.title}</h3>
                <p className="text-muted-foreground">{entry.content}</p>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}