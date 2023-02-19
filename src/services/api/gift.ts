import { IEditGiftData, IRemoveGiftResponse, IBuyGiftResponse, IGift, IGiftData } from '../../types/info-types';
import instance from './auth';

export const getGifts = async (): Promise<IGift[]> => {
  const result = await instance.get<IGift[]>('/gift');
  return result.data;
};

export const addGift = async ({ data, childId }: IGiftData): Promise<IGift> => {
  const result = await instance.post<IGift>(`/gift/${childId}`, data, {
    headers: {
      ' content-type': 'multipart/form-data',
    },
  });
  return result.data;
};

export const editGift = async ({ data, giftId }: IEditGiftData): Promise<IGift> => {
  const result = await instance.patch<IGift>(`/gift/${giftId}`, data, {
    headers: {
      ' content-type': 'multipart/form-data',
    },
  });
  return result.data;
};

export const removeGift = async (giftId: string): Promise<IRemoveGiftResponse> => {
  const result = await instance.delete<IRemoveGiftResponse>(`/gift/${giftId}`);
  return result.data;
};

export const buyGift = async (giftId: string): Promise<IBuyGiftResponse> => {
  const result = await instance.patch<IBuyGiftResponse>(`/gift/buy/${giftId}`);
  return result.data;
};
