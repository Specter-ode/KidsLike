import * as api from '../../services/api/auth';
import { toast } from 'react-toastify';
import {
  IRegisterData,
  ILoginData,
  ILoginResponse,
  IRefreshResponse,
  IRefreshData,
  IUserResponse,
} from '../../types/auth-types';
import { AxiosError } from 'axios';
import { RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

export const handleRegistration = createAsyncThunk<void, IRegisterData, { rejectValue: string }>(
  'auth/register',
  async (data, { rejectWithValue }) => {
    console.log('handleRegistration data: ', data);
    try {
      await api.register(data);
      toast.success(`Registration is success.`);

      return;
    } catch (error) {
      const err = error as AxiosError<string>;
      if (!err.response) {
        throw error;
      } else {
        if (err.response.status === 409) {
          toast.error(`Такой пользователь уже существует`);
          return rejectWithValue('User with this email already exists');
        } else {
          toast.error(`Извините, регистрация не удалась. Попробуйте еще раз`);
          return rejectWithValue(err.message);
        }
      }
    }
  }
);

export const handleLogin = createAsyncThunk<ILoginResponse, ILoginData, { rejectValue: string }>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.login(data);
      console.log('handleLogin result: ', result);
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      if (!err.response) {
        throw error;
      } else {
        if (err.response.status === 403) {
          toast.error(`Неправильная электронная почта или пароль`);
          return rejectWithValue('Login failed. Check email and password. Try again.');
        } else {
          toast.error(`Извините, регистрация не удалась. Попробуйте еще раз`);
          return rejectWithValue(err.message);
        }
      }
    }
  }
);

export const handleLogout = createAsyncThunk<void, undefined, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.logout();
      return;
    } catch (error) {
      const err = error as AxiosError<string>;
      if (!err.response) {
        throw error;
      } else {
        toast.error(`Извините, выход с аккаунта не удался. Попробуйте еще раз`);
        return rejectWithValue(err.message);
      }
    }
  }
);

export const handleRefresh = createAsyncThunk<IRefreshResponse, IRefreshData, { rejectValue: string }>(
  'auth/refresh',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.refresh(data);
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      if (!err.response) {
        throw error;
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const getUser = createAsyncThunk<IUserResponse, undefined, { rejectValue: string; state: RootState }>(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.getCurrentUser();
      console.log('getCurrentUser result: ', result);
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      if (!err.response) {
        throw error;
      } else {
        toast.error(`Не удалось получить данные о пользователе`);
        return rejectWithValue(err.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      if (!state.auth.accessToken) {
        return false;
      }
      api.setToken(state.auth.accessToken);
      return true;
    },
  }
);
