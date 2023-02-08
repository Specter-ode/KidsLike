import { toast } from 'react-toastify';
import { IChild, INewChildData, IResponseError, ITask, ITaskData } from './info-types';
import { AxiosError } from 'axios';
import * as childApi from '../../services/api/child';
import * as taskApi from '../../services/api/task';
import * as giftApi from '../../services/api/gift';
import { RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addChild = createAsyncThunk<IChild, INewChildData, { rejectValue: IResponseError }>(
  'info/addChild',
  async (data, { rejectWithValue }) => {
    try {
      const result = await childApi.addChild(data);
      console.log('addChild result: ', result);
      toast.success('Ребенок добавлен. Вы можете создавать и планировать задания');
      return result;
    } catch (error) {
      const err = error as AxiosError<IResponseError>;
      console.log('addChild error: ', error);
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

export const getTasks = createAsyncThunk<ITask[], undefined, { rejectValue: IResponseError }>(
  'info/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const result = await taskApi.getTasks();
      console.log('getTasks result: ', result);
      return result;
    } catch (error) {
      toast.error(`Sorry, login failed. Check email and password. Try again.`);
      return rejectWithValue(error as IResponseError);
    }
  }
);

export const addTask = createAsyncThunk<ITask, ITaskData, { rejectValue: IResponseError; state: RootState }>(
  'info/addTask',
  async ({ data, childId }, { rejectWithValue }) => {
    try {
      const result = await taskApi.addTask(data, childId);
      console.log('getTasks result: ', result);
      return result;
    } catch (error) {
      toast.error(`Sorry, login failed. Check email and password. Try again.`);
      return rejectWithValue(error as IResponseError);
    }
  }
);
