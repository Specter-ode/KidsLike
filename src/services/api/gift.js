import instance from './auth';

export const getGifts = async () => {
  const result = await instance.get('/gift');
  return result.data;
};

export const addGift = async (data, childId) => {
  const result = await instance.post(`/gift/${childId}`, data);
  return result.data;
};

export const changeGift = async (data, giftId) => {
  const result = await instance.patch(`/gift/${giftId}`, data);
  return result.data;
};

export const removeGift = async giftId => {
  const result = await instance.delete(`/gift/${giftId}`);
  return result.data;
};

export const buyGift = async giftId => {
  const result = await instance.patch(`/gift/buy/${giftId}`);
  return result.data;
};

export const resetGiftPurchase = async giftId => {
  const result = await instance.patch(`/gift/reset/${giftId}`);
  return result.data;
};
