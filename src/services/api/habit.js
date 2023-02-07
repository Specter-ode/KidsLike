import instance from './auth';

export const getHabits = async () => {
  const result = await instance.get('/habit');
  return result.data;
};

export const addHabit = async (data, childId) => {
  const result = await instance.post(`/habit/${childId}`, data);
  return result.data;
};

export const changeHabit = async (data, habitId) => {
  const result = await instance.patch(`/habit/${habitId}`, data);
  return result.data;
};

export const removeHabit = async habitId => {
  const result = await instance.delete(`/habit/${habitId}`);
  return result.data;
};

export const confirmHabit = async (date, habitId) => {
  const result = await instance.patch(`/habit/confirm/${habitId}`, date);
  return result.data;
};

export const cancelHabit = async (date, habitId) => {
  const result = await instance.patch(`/habit/cancel/${habitId}`, date);
  return result.data;
};
