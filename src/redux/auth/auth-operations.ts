import * as api from '../../services/api/auth';
import { toast } from 'react-toastify';
import {
  IRegisterData,
  IResponseError,
  ILoginData,
  ILoginResponse,
  IRefreshResponse,
  IRefreshData,
  IUserResponse,
  ILogoutData,
} from './auth-types';
import { AxiosError } from 'axios';
import { RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

export const handleRegistration = createAsyncThunk<void, IRegisterData, { rejectValue: IResponseError }>(
  'auth/register',
  async (data, { rejectWithValue }) => {
    console.log('handleRegistration data: ', data);
    try {
      const result = await api.register(data);
      toast.success(`Registration is success.`);
      const navigate = useNavigate();
      navigate('/login');
      return result;
    } catch (error) {
      const err = error as AxiosError<IResponseError>;
      console.log('handleRegistration error: ', error);
      if (!err.response) {
        throw error;
      }
      if (err.response.data.message === 'User with this email already exists') {
        toast.error(`Такой пользователь уже существует`);
      } else {
        toast.error(`Извините, регистрация не удалась. Попробуйте еще раз`);
      }
      return rejectWithValue(error as IResponseError);
    }
  }
);

export const handleLogin = createAsyncThunk<ILoginResponse, ILoginData, { rejectValue: IResponseError }>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.login(data);
      console.log('handleLogin result: ', result);
      return result;
    } catch (error) {
      toast.error(`Sorry, login failed. Check email and password. Try again.`);
      return rejectWithValue(error as IResponseError);
    }
  }
);

export const handleLogout = createAsyncThunk<ILogoutData, undefined, { rejectValue: IResponseError }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.logout();
      return result;
    } catch (error) {
      toast.error(`Sorry, Logout failed. Try again.`);
      return rejectWithValue(error as IResponseError);
    }
  }
);

export const handleRefresh = createAsyncThunk<IRefreshResponse, IRefreshData, { rejectValue: IResponseError }>(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.refresh();
      return result;
    } catch (error) {
      toast.error(`Sorry, Logout failed. Try again.`);
      return rejectWithValue(error as IResponseError);
    }
  }
);

export const getUser = createAsyncThunk<IUserResponse, undefined, { rejectValue: IResponseError; state: RootState }>(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.getCurrentUser();
      console.log('getCurrentUser result: ', result);
      return result;
    } catch (error) {
      toast.error(`Sorry, getUser failed. Try again.`);
      return rejectWithValue(error as IResponseError);
    }
  }
  // {
  //   condition: (_, thunkAPI) => {
  //     const state = thunkAPI.getState();
  //     if (!state.auth.accessToken) {
  //       return false;
  //     }
  //     api.setToken(state.auth.accessToken);
  //   },
  // }
);
