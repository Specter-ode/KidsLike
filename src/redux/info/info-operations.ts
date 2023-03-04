import { toast } from 'react-toastify';
import {
  IBuyGiftsResponse,
  IBuyGiftsData,
  IChild,
  IEditGiftData,
  IEditTaskData,
  IGift,
  IGiftData,
  INewChildData,
  ITask,
  ITaskActiveStatusData,
  ITaskActiveStatusResponse,
  ITaskCompletedStatusData,
  ITaskCompletedStatusResponse,
  ITaskData,
} from '../../types/info-types';
import { AxiosError } from 'axios';
import * as childApi from '../../services/api/child';
import * as taskApi from '../../services/api/task';
import * as giftApi from '../../services/api/gift';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addChild = createAsyncThunk<IChild, INewChildData, { rejectValue: string }>(
  'info/addChild',
  async (data, { rejectWithValue }) => {
    try {
      const result = await childApi.addChild(data);
      console.log('addChild result: ', result);
      toast.success('Ребенок добавлен. Вы можете создавать и планировать задания');
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      console.log('addChild error: ', error);
      if (!err.response) {
        throw error;
      } else {
        if (err.response.status === 409) {
          toast.error(`Ребенок с таким именем и полом уже существует`);
          return rejectWithValue('Child with this name and gender already exists');
        } else {
          toast.error(`Извините, регистрация не удалась. Попробуйте еще раз`);
          return rejectWithValue(err.message);
        }
      }
    }
  }
);

export const getTasks = createAsyncThunk<ITask[], undefined, { rejectValue: string }>(
  'info/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const result = await taskApi.getTasks();
      console.log('getTasks result: ', result);
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      console.log('getTasks error: ', error);
      if (!err.response) {
        throw error;
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const addTask = createAsyncThunk<ITask, ITaskData, { rejectValue: string }>(
  'info/addTask',
  async (data, { rejectWithValue }) => {
    try {
      const result = await taskApi.addTask(data);
      console.log('addTask result: ', result);
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      console.log('addTask error: ', error);
      if (!err.response) {
        throw error;
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const changeTaskActiveStatus = createAsyncThunk<
  ITaskActiveStatusResponse,
  ITaskActiveStatusData,
  { rejectValue: string }
>('info/changeTaskActiveStatus', async (data, { rejectWithValue }) => {
  try {
    const result = await taskApi.changeTaskActiveStatus(data);
    return result;
  } catch (error) {
    const err = error as AxiosError<string>;
    console.log('changeTaskActiveStatus error: ', error);
    if (!err.response) {
      throw error;
    } else {
      return rejectWithValue(err.message);
    }
  }
});

export const changeTaskCompletedStatus = createAsyncThunk<
  ITaskCompletedStatusResponse,
  ITaskCompletedStatusData,
  { rejectValue: string }
>('info/changeTaskCompletedStatus', async (data, { rejectWithValue }) => {
  console.log('data: ', data);
  try {
    const result = await taskApi.changeTaskCompletedStatus(data);
    console.log('changeTaskCompletedStatus result: ', result);
    return result;
  } catch (error) {
    const err = error as AxiosError<string>;
    console.log('changeTaskCompletedStatus error: ', error);
    if (!err.response) {
      throw error;
    } else {
      return rejectWithValue(err.message);
    }
  }
});

export const editTask = createAsyncThunk<ITask, IEditTaskData, { rejectValue: string }>(
  'info/editTask',
  async (data, { rejectWithValue }) => {
    try {
      const result = await taskApi.editTask(data);
      console.log('editTask result: ', result);
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      console.log('editTask error: ', error);
      if (!err.response) {
        throw error;
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);
export const removeTask = createAsyncThunk<string, string, { rejectValue: string }>(
  'info/removeTask',
  async (taskId, { rejectWithValue }) => {
    try {
      await taskApi.removeTask(taskId);
      return taskId;
    } catch (error) {
      const err = error as AxiosError<string>;
      console.log('removeTask error: ', error);
      if (!err.response) {
        throw error;
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const addGift = createAsyncThunk<IGift, IGiftData, { rejectValue: string }>(
  'info/addGift',
  async (data, { rejectWithValue }) => {
    try {
      const result = await giftApi.addGift(data);
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      console.log('addGift error: ', error);
      if (!err.response) {
        throw error;
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const editGift = createAsyncThunk<IGift, IEditGiftData, { rejectValue: string }>(
  'info/editGift',
  async (data, { rejectWithValue }) => {
    try {
      const result = await giftApi.editGift(data);
      console.log('editGift result: ', result);
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      console.log('editGift error: ', error);
      if (!err.response) {
        throw error;
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const removeGift = createAsyncThunk<string, string, { rejectValue: string }>(
  'info/removeGift',
  async (giftId, { rejectWithValue }) => {
    try {
      await giftApi.removeGift(giftId);
      return giftId;
    } catch (error) {
      const err = error as AxiosError<string>;
      console.log('removeGift error: ', error);
      if (!err.response) {
        throw error;
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const buyGifts = createAsyncThunk<IBuyGiftsResponse, IBuyGiftsData, { rejectValue: string }>(
  'info/buyGifts',
  async (data, { rejectWithValue }) => {
    try {
      const result = await giftApi.buyGifts(data);
      console.log('buyGifts result: ', result);
      return result;
    } catch (error) {
      const err = error as AxiosError<string>;
      console.log('buyGifts error: ', error);
      if (!err.response) {
        throw error;
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);
