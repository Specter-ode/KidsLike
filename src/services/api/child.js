import instance from './auth';

export const addChild = async data => {
  const result = await instance.post('/child', data);
  return result.data;
};
