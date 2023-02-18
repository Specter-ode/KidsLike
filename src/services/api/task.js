import instance from './auth';

export const getTasks = async () => {
  const result = await instance.get('/task');
  return result.data;
};

export const addTask = async (data, childId) => {
  const result = await instance.post(`/task/${childId}`, data, {
    headers: {
      ' content-type': 'multipart/form-data',
    },
  });
  return result.data;
};

export const editTask = async (data, taskId) => {
  const result = await instance.patch(`/task/${taskId}`, data, {
    headers: {
      ' content-type': 'multipart/form-data',
    },
  });
  return result.data;
};

export const removeTask = async taskId => {
  const result = await instance.delete(`/task/${taskId}`);
  return result.data;
};

export const changeTaskActiveStatus = async (data, taskId) => {
  const result = await instance.patch(`/task/${taskId}/active`, data);
  return result.data;
};

export const changeTaskCompletedStatus = async (date, taskId) => {
  const result = await instance.patch(`/task/${taskId}/completed`, date);
  return result.data;
};
