import axios from 'axios';

const { REACT_APP_BACKEND_URL = 'http://localhost:4000/api' } = process.env;
console.log('REACT_APP_BACKEND_URL: ', REACT_APP_BACKEND_URL);
const instance = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
});

export const setToken = (token = '') => {
  if (token) {
    return (instance.defaults.headers['Authorization'] = `Bearer ${token}`);
  }
  instance.defaults.headers['Authorization'] = '';
};

export const register = async data => {
  const result = await instance.post('/auth/register', data);
  setToken(result.data.token);
  return result.data;
};

export const login = async data => {
  const result = await instance.post('/auth/login', data);
  setToken(result.data.token);
  return result.data;
};

export const logout = async data => {
  const result = await instance.get('/auth/logout', data);
  setToken('');
  return result.data;
};

export const getCurrentUser = async () => {
  const result = await instance.get('/user/info');
  console.log('result: ', result);
  return result.data;
};

export default instance;
