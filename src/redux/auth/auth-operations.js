import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api/auth';
import { toast } from 'react-toastify';

export const handleRegistration = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const result = await api.register(data);
    toast.success(`Registration is success.`);
    return result;
  } catch (error) {
    toast.error(`Sorry, registration failed. Try again.`);
    return rejectWithValue(error.response.data.message || error.message);
  }
});

export const handleLogin = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const result = await api.login(data);
    return result;
  } catch (error) {
    toast.error(`Sorry, login failed. Check email and password. Try again.`);
    return rejectWithValue(error.response.data.message || error.message);
  }
});

export const handleLogout = createAsyncThunk('auth/logout', async (data, { rejectWithValue }) => {
  try {
    const result = await api.logout(data);
    return result;
  } catch (error) {
    toast.error(`Sorry, registration failed. Try again.`);
    return rejectWithValue(error.message);
  }
});

export const getCurrentUser = createAsyncThunk(
  'user/info',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.getCurrentUser();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      if (!state.auth.accessToken) {
        return false;
      }
      api.setToken(state.auth.accessToken);
    },
  }
);
