import {
  IEditTaskData,
  ITask,
  ITaskActiveStatusData,
  ITaskActiveStatusResponse,
  ITaskCompletedStatusResponse,
  ITaskData,
} from '../../types/info-types';
import instance from './auth';
import { ITaskCompletedStatusData } from '../../types/info-types';

export const getTasks = async (): Promise<ITask[]> => {
  const result = await instance.get<ITask[]>('/task');
  return result.data;
};

export const addTask = async ({ data, childId }: ITaskData): Promise<ITask> => {
  const result = await instance.post<ITask>(`/task/${childId}`, data, {
    headers: {
      ' content-type': 'multipart/form-data',
    },
  });
  return result.data;
};

export const editTask = async ({ data, taskId }: IEditTaskData): Promise<ITask> => {
  const result = await instance.put<ITask>(`/task/${taskId}`, data, {
    headers: {
      ' content-type': 'multipart/form-data',
    },
  });
  return result.data;
};

export const removeTask = async (taskId: string): Promise<void> => {
  await instance.delete<void>(`/task/${taskId}`);
};

export const changeTaskActiveStatus = async ({
  days,
  taskId,
}: ITaskActiveStatusData): Promise<ITaskActiveStatusResponse> => {
  const result = await instance.patch<ITaskActiveStatusResponse>(`/task/${taskId}/active`, { days });
  return result.data;
};

export const changeTaskCompletedStatus = async ({
  date,
  taskId,
}: ITaskCompletedStatusData): Promise<ITaskCompletedStatusResponse> => {
  const result = await instance.patch<ITaskCompletedStatusResponse>(`/task/${taskId}/completed`, { date });
  return result.data;
};
