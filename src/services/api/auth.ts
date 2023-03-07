import axios from 'axios';
import { setIsAuth, setSidAndTokens } from '../../redux/auth/auth-slice';
import { store } from '../../redux/store';
import {
  ILoginData,
  ILoginResponse,
  IRefreshData,
  IRefreshResponse,
  IRegisterData,
  IRegisterResponse,
  IUserResponse,
} from '../../types/auth-types';
const { REACT_APP_BACKEND_URL } = process.env;
const instance = axios.create({
  baseURL: REACT_APP_BACKEND_URL || 'http://localhost:4000/',
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

export const getCurrentUser = async (): Promise<IUserResponse> => {
  const result = await instance.get<IUserResponse>('/user');
  return result.data;
};

export const refresh = async (data: IRefreshData): Promise<IRefreshResponse> => {
  const result = await instance.post<IRefreshResponse>('/auth/refresh', data);
  setToken(result.data.accessToken);
  return result.data;
};

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      const storage = localStorage.getItem('persist:auth');
      if (storage) {
        const { refreshToken, sid } = JSON.parse(storage);
        if (!sid || !refreshToken) return Promise.reject(error);
        const { dispatch } = store;
        setToken(refreshToken.slice(1, -1));
        try {
          const data = await refresh({ sid: sid.slice(1, -1) });
          dispatch(setSidAndTokens(data));
          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios(error.config);
        } catch (error) {
          console.log('interceptors error: ', error);
          dispatch(setSidAndTokens({ accessToken: '', refreshToken: '', sid: '' }));
          dispatch(setIsAuth(false));
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
