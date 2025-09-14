import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PATH,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  const { access_token, refresh_token } = response.data;
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }
  
  return response.data;
};

export const register = async (first_name: string, last_name: string, email: string, password: string) => {
  const response = await api.post('/register', { first_name, last_name, email, password });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/me');
  return response.data;
};

export const listTokens = async () => {
  const response = await api.get('/tokens');
  return response.data;
};

export const createToken = async (name: string) => {
  const response = await api.post('/tokens', { name });
  return response.data;
};

export const deleteToken = async (tokenId: number) => {
  await api.delete(`/tokens/${tokenId}`);
};

interface SearchParams {
  query: string;
  engine?: 'google' | 'wikipedia';
  language?: string;
  region?: string;
  safe_search?: 0 | 1 | 2;
  time_range?: 'day' | 'week' | 'month' | 'year';
  page?: number;
  search_type?: 'web' | 'images' | 'videos' | 'news' | 'places' | 'shopping';
  num?: number;
  domain?: string;
}

export const performSearch = async (params: SearchParams, apiToken: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_PATH}/api/search`, params, {
    headers: { 
      'X-API-Key': apiToken,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const getUsageStats = async () => {
  const response = await api.get('/usage-stats');
  return response.data;
};

export const getMyPackages = async () => {
  const response = await api.get('/my-packages');
  return response.data;
};

export default api;
