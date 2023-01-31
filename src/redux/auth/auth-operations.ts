import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api/auth';
import { toast } from 'react-toastify';
import { AuthResponseType, AuthDataType, ResponseError } from './types';
import { AxiosError } from 'axios';

export const handleRegistration = createAsyncThunk<AuthResponseType, AuthDataType, {rejectValue: ResponseError}>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const result = await api.register(data);
    console.log('handleRegistration result: ', result);
    toast.success(`Registration is success.`);
    return result;
  } catch (error) {
    const err = error as AxiosError<ResponseError>; 
    console.log('error: ', error);
    if (!err.response) {
      throw error;
    }
    if ( err.response.data.message==='User with this email already exists') {
      toast.error(`Такой пользователь уже существует`);
    } else {
      toast.error(`Извините, регистрация не удалась. Попробуйте еще раз`);
    }
    return rejectWithValue(error as ResponseError);
  }
});

export const handleLogin = createAsyncThunk<AuthResponseType, AuthDataType, {rejectValue: ResponseError}>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const result = await api.login(data);
    console.log('handleLogin result: ', result);
    return result;
  } catch (error) {
    toast.error(`Sorry, login failed. Check email and password. Try again.`);
    // return rejectWithValue(error.response.data.message || error.message)
  }
});

export const handleLogout = createAsyncThunk('auth/logout', async (data, { rejectWithValue }) => {
  try {
    const result = await api.logout(data);
    return result;
  } catch (error) {
    toast.error(`Sorry, Logout failed. Try again.`);
    // return rejectWithValue(error.message);
  }
});

export const getCurrentUser = createAsyncThunk<AuthResponseType, undefined, {rejectValue: ResponseError}>(
  'user/info',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.getCurrentUser();
      console.log('getCurrentUser result: ', result);
      return result;
    } catch (error) {
      toast.error(`Sorry, getUser failed. Try again.`);
      // return rejectWithValue(error);
    }
  },
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
