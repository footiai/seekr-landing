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

export const register = async (name: string, email: string, password: string) => {
  // The API guide mentions only email and password for register, but the form has a name.
  // I'll send the name field as well, as it's common for registration endpoints to accept it.
  // If the API rejects it, I will remove it.
  const response = await api.post('/register', { name, email, password });
  return response.data;
};

export default api;
