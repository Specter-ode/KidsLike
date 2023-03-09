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
import { AppDispatch, RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import text from './text.json';

export const handleRegistration = createAsyncThunk<void, IRegisterData, { rejectValue: string; state: RootState }>(
  'auth/register',
  async (data, { rejectWithValue, getState }) => {
    const { lang } = getState().auth;
    try {
      await api.register(data);
      toast.success(text[lang].userRegistered);

      return;
    } catch (error) {
      const err = error as AxiosError<string>;
      if (!err.response) {
        throw error;
      } else {
        if (err.response.status === 409) {
          toast.error(text[lang].userExisted);
          return rejectWithValue('User with this email already exists');
        } else {
          toast.error(text[lang].registerFailed);
          return rejectWithValue(err.message);
        }
      }
    }
  }
);

export const handleLogin = createAsyncThunk<ILoginResponse, ILoginData, { rejectValue: string; state: RootState }>(
  'auth/login',
  async (data, { rejectWithValue, getState }) => {
    const { lang } = getState().auth;
    try {
      const result = await api.login(data);
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      if (!err.response) {
        throw error;
      } else {
        if (err.response.status === 403) {
          toast.error(text[lang].emailOrPassFailed);
          return rejectWithValue('Login failed. Check email and password. Try again.');
        } else {
          toast.error(text[lang].loginFailed);
          return rejectWithValue(err.message);
        }
      }
    }
  }
);

export const handleLogout = createAsyncThunk<void, undefined, { rejectValue: string; state: RootState }>(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    const { lang } = getState().auth;
    try {
      await api.logout();
      return;
    } catch (error) {
      const err = error as AxiosError<string>;
      if (!err.response) {
        throw error;
      } else {
        toast.error(text[lang].logoutFailed);
        return rejectWithValue(err.message);
      }
    }
  }
);

export const handleRefresh = createAsyncThunk<
  IRefreshResponse,
  IRefreshData,
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>(
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
  },
  {
    condition: (_, { getState }) => {
      const { refreshToken, sid } = getState().auth;
      if (refreshToken && sid) {
        return true;
      }
      return false;
    },
  }
);

export const getUser = createAsyncThunk<IUserResponse, undefined, { rejectValue: string; state: RootState }>(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.getCurrentUser();
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      if (!err.response) {
        throw error;
      } else {
        return rejectWithValue(err.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const { accessToken } = getState().auth;
      if (!accessToken) {
        return false;
      }
      api.setToken(accessToken);
      return true;
    },
  }
);
