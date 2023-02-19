import { IChild, INewChildData } from '../../types/info-types';
import instance from './auth';

export const addChild = async (data: INewChildData): Promise<IChild> => {
  const result = await instance.post<IChild>('/child', data);
  return result.data;
};
