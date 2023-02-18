import instance from './auth';

export const getGifts = async () => {
  const result = await instance.get('/gift');
  return result.data;
};

export const addGift = async (data, childId) => {
  const result = await instance.post(`/gift/${childId}`, data, {
    headers: {
      ' content-type': 'multipart/form-data',
    },
  });
  return result.data;
};

export const editGift = async (data, giftId) => {
  const result = await instance.patch(`/gift/${giftId}`, data, {
    headers: {
      ' content-type': 'multipart/form-data',
    },
  });
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
