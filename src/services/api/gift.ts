import {
  IEditGiftData,
  IRemoveGiftResponse,
  IBuyGiftsResponse,
  IGift,
  IGiftData,
  IBuyGiftsData,
} from '../../types/info-types';
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
  const result = await instance.put<IGift>(`/gift/${giftId}`, data, {
    headers: {
      ' content-type': 'multipart/form-data',
    },
  });
  return result.data;
};

export const removeGift = async (giftId: string): Promise<void> => {
  await instance.delete<void>(`/gift/${giftId}`);
};

export const buyGifts = async ({ childId, giftIds }: IBuyGiftsData): Promise<IBuyGiftsResponse> => {
  const result = await instance.patch<IBuyGiftsResponse>(`/gift/buy/${childId}`, { giftIds });
  return result.data;
};
