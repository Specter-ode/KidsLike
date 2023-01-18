import instance from './auth';

export const getGiftData = async () => {
  const { data } = await instance.get('/gift');
  return data;
};

export const changeGiftData = async data => {
  const { data } = await instance.patch('/gift', data);
  return data;
};
// {
//     "giftIds": [
//       1,
//       2,
//       8
//     ]
//   }
// ===========================================================================
