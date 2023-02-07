import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IChild, INewChildData, IResponseError } from './info-types';
import { AxiosError } from 'axios';
import * as api from '../../services/api/child';

export const addChild = createAsyncThunk<IChild, INewChildData, { rejectValue: IResponseError }>(
  'info/addChild',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addChild(data);
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
