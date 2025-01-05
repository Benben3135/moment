// frontend/src/lib/api/client.ts
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const createApiClient = (token: string) => {
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    // Journal endpoints
    journal: {
      create: (data: any) => api.post('/journal', data),
      getAll: () => api.get('/journal'),
    },
    
    // Meditation endpoints
    meditation: {
      logSession: (data: any) => api.post('/meditation/session', data),
      getStats: () => api.get('/meditation/stats'),
    },
  };
};

// Hook to use the API client
export const useApi = () => {
  const { getToken } = useAuth();
  
  const getApiClient = async () => {
    const token = await getToken();
    return createApiClient(token!);
  };

  return { getApiClient };
};