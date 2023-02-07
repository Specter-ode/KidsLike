import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kidslike-v1-backend.goit.global',
});

export const setToken = (token = '') => {
  if (token) {
    return (instance.defaults.headers['Authorization'] = `Bearer ${token}`);
  }
  instance.defaults.headers['Authorization'] = '';
};

export const register = async data => {
  await instance.post('/auth/register', data);
};

export const login = async data => {
  const result = await instance.post('/auth/login', data);
  setToken(result.data.accessToken);
  return result.data;
};

export const logout = async () => {
  const result = await instance.post('/auth/logout');
  setToken('');
  return result.data;
};

export const refresh = async data => {
  const result = await instance.post('/auth/refresh', data);
  setToken(result.data.accessToken);
  return result.data;
};

export const getCurrentUser = async () => {
  const result = await instance.get('/user');
  return result.data;
};

export default instance;
