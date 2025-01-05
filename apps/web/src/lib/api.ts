import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const createUser = async (userData:any) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const updateUser = async (clerkId:any, updates:any) => {
  const response = await api.put(`/users/${clerkId}`, updates);
  return response.data;
};

export const getUser = async (clerkId:any) => {
  const response = await api.get(`/users/${clerkId}`);
  return response.data;
};