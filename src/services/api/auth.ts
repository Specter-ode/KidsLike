import axios from 'axios';
import {
  ILoginData,
  ILoginResponse,
  IRefreshData,
  IRefreshResponse,
  IRegisterData,
  IRegisterResponse,
  IUserResponse,
} from '../../types/auth-types';
const instance = axios.create({
  baseURL: 'http://localhost:4000/',
});

export const setToken = (token: string = ''): void => {
  if (token) {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    instance.defaults.headers['Authorization'] = '';
  }
};

export const register = async (data: IRegisterData): Promise<void> => {
  await instance.post<IRegisterResponse>('/auth/register', data);
};

export const login = async (data: ILoginData): Promise<ILoginResponse> => {
  const result = await instance.post<ILoginResponse>('/auth/login', data);
  setToken(result.data.accessToken);
  return result.data;
};
export const logout = async (): Promise<void> => {
  await instance.post<void>('/auth/logout');
  setToken('');
};

export const refresh = async (data: IRefreshData): Promise<IRefreshResponse> => {
  const result = await instance.post<IRefreshResponse>('/auth/refresh', data);
  setToken(result.data.accessToken);
  return result.data;
};

export const getCurrentUser = async (): Promise<IUserResponse> => {
  const result = await instance.get<IUserResponse>('/user');
  return result.data;
};

export default instance;
