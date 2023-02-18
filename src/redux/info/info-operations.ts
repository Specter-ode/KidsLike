import { toast } from 'react-toastify';
import {
  IBuyGiftResponse,
  IChild,
  IEditGiftData,
  IEditTaskData,
  IGift,
  IGiftData,
  INewChildData,
  IRemoveGiftResponse,
  IRemoveTaskResponse,
  IResponseError,
  ITask,
  ITaskActiveStatusData,
  ITaskActiveStatusResponse,
  ITaskCompletedStatusData,
  ITaskCompletedStatusResponse,
  ITaskData,
} from './info-types';
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
      console.log('addTask result: ', result);
      return result;
    } catch (error) {
      toast.error(`Sorry, login failed. Check email and password. Try again.`);
      return rejectWithValue(error as IResponseError);
    }
  }
);

export const changeTaskActiveStatus = createAsyncThunk<
  ITaskActiveStatusResponse,
  ITaskActiveStatusData,
  { rejectValue: IResponseError; state: RootState }
>('info/changeTaskActiveStatus', async ({ days, taskId }, { rejectWithValue }) => {
  try {
    const result = await taskApi.changeTaskActiveStatus(days, taskId);
    console.log('changeTaskActiveStatus result: ', result);
    return result;
  } catch (error) {
    toast.error(`Sorry, login failed. Check email and password. Try again.`);
    return rejectWithValue(error as IResponseError);
  }
});

export const changeTaskCompletedStatus = createAsyncThunk<
  ITaskCompletedStatusResponse,
  ITaskCompletedStatusData,
  { rejectValue: IResponseError; state: RootState }
>('info/changeTaskCompletedStatus', async ({ date, taskId }, { rejectWithValue }) => {
  try {
    const result = await taskApi.changeTaskCompletedStatus(date, taskId);
    console.log('changeTaskCompletedStatus result: ', result);
    return result;
  } catch (error) {
    toast.error(`Sorry, login failed. Check email and password. Try again.`);
    return rejectWithValue(error as IResponseError);
  }
});

export const editTask = createAsyncThunk<ITask, IEditTaskData, { rejectValue: IResponseError; state: RootState }>(
  'info/editTask',
  async ({ data, taskId }, { rejectWithValue }) => {
    try {
      const result = await taskApi.editTask(data, taskId);
      console.log('confirmTask result: ', result);
      return result;
    } catch (error) {
      toast.error(`Sorry, confirmTask failed.`);
      return rejectWithValue(error as IResponseError);
    }
  }
);
export const removeTask = createAsyncThunk<
  IRemoveTaskResponse,
  string,
  { rejectValue: IResponseError; state: RootState }
>('info/removeTask', async (taskId, { rejectWithValue }) => {
  try {
    return await taskApi.removeTask(taskId);
  } catch (error) {
    toast.error(`Sorry, removeTask failed.`);
    return rejectWithValue(error as IResponseError);
  }
});

export const addGift = createAsyncThunk<IGift, IGiftData, { rejectValue: IResponseError; state: RootState }>(
  'info/addGift',
  async ({ data, childId }, { rejectWithValue }) => {
    try {
      const result = await giftApi.addGift(data, childId);
      console.log('addGift result: ', result);
      return result;
    } catch (error) {
      toast.error(`Sorry, addGift failed. Try again.`);
      return rejectWithValue(error as IResponseError);
    }
  }
);

export const editGift = createAsyncThunk<IGift, IEditGiftData, { rejectValue: IResponseError; state: RootState }>(
  'info/editGift',
  async ({ data, giftId }, { rejectWithValue }) => {
    try {
      const result = await giftApi.editGift(data, giftId);
      console.log('editGift result: ', result);
      return result;
    } catch (error) {
      toast.error(`Sorry, editGift failed.`);
      return rejectWithValue(error as IResponseError);
    }
  }
);
export const removeGift = createAsyncThunk<
  IRemoveGiftResponse,
  string,
  { rejectValue: IResponseError; state: RootState }
>('info/removeGift', async (giftId, { rejectWithValue }) => {
  try {
    return await giftApi.removeGift(giftId);
  } catch (error) {
    toast.error(`Sorry, gift didn't delete .`);
    return rejectWithValue(error as IResponseError);
  }
});

export const buyGift = createAsyncThunk<IBuyGiftResponse, string, { rejectValue: IResponseError; state: RootState }>(
  'info/buyGift',
  async (giftId, { rejectWithValue }) => {
    try {
      const result = await taskApi.changeTaskCompletedStatus(giftId);
      console.log('buyGift result: ', result);
      return result;
    } catch (error) {
      toast.error(`Sorry, gift purchase failed.  Try again.`);
      return rejectWithValue(error as IResponseError);
    }
  }
);
