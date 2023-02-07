import instance from './auth';

export const getTasks = async () => {
  const result = await instance.get('/task');
  return result.data;
};

export const getFinishedTasks = async childId => {
  const result = await instance.get(`/task/finished/${childId}`);
  return result.data;
};

export const addTask = async (data, childId) => {
  const result = await instance.post(`/task/${childId}`, data);
  return result.data;
};

export const changeTask = async (data, taskId) => {
  const result = await instance.patch(`/task/${taskId}`, data);
  return result.data;
};

export const removeTask = async taskId => {
  const result = await instance.delete(`/task/${taskId}`);
  return result.data;
};

export const confirmTask = async (date, taskId) => {
  const result = await instance.patch(`/task/confirm/${taskId}`, date);
  return result.data;
};

export const cancelTask = async (date, taskId) => {
  const result = await instance.patch(`/task/cancel/${taskId}`, date);
  return result.data;
};

export const resetTask = async (date, taskId) => {
  const result = await instance.patch(`/task/reset/${taskId}`, date);
  return result.data;
};
