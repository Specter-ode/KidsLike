import instance from './auth';

export const addTask = async newTask => {
  const { data } = await instance.patch(`/task/${newTask}`);
  return data;
};
// {
// title: string
// reward: integer
// file: string($binary) Image file
// }
// ===========================================================================
export const getTaskActiveStatus = async taskData => {
  const { data } = await instance.patch('/task/active', taskData);
  return data;
};

// {
//   "tasks": [
//     {
//       "taskId": "507f1f77bcf86cd799439011",
//       "days": [
//         {
//           "date": "2020-12-28",
//           "isActive": false,
//           "isCompleted": false
//         },
//         {
//           "date": "2020-12-29",
//           "isActive": false,
//           "isCompleted": false
//         },..............
// ===========================================================================
export const getTaskActiveStatusById = async (taskId, days) => {
  const { data } = await instance.patch(`/task/single-active/${taskId}`, days);
  return data;
};
// {
//   "days": [
//     true,
//     true,
//     false,
//     true,
//     false,
//     false,
//     false
//   ]
// }

// ===========================================================================
export const switchTaskCompleteStatus = async (taskId, date) => {
  const { data } = await instance.delete(`/task/switch/${taskId}`, date);
  return data;
};
// {
//   "date": "2020-12-31"
// }
