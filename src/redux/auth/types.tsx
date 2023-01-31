type Day = {
  date: Date;
  isActive: boolean;
  isCompleted: boolean;
};

type Task = {
  title: string;
  reward: number;
  imageUrl: string;
  days: Day[];
  _id: string;
  __v: number;
};

export type User = {
  email: string;
  id: string;
  balance: number;
};

export type Week = {
  startWeekDate: string;
  endWeekDate: string;
  rewardsGained: number;
  rewardsPlanned: number;
  _id: string;
  __v: number;
  tasks: Task[];
};

export type InitialStateType = {
  token: null | string;
  user: User;
  week: Week;
  error: null | string;
  isLoading: boolean;
  isAuth: boolean;
};

export type AuthDataType = {
  email: string;
  password: string;
};

export type ResponseError = {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
};

export type AuthResponseType = {
  message: string;
  success: string;
  token: string;
  user: User;
  week: Week;
  _v: number;
};

export type AddTaskResponseType = {
  title: string;
  reward: number;
  imageUrl: string;
  id: string;
  days: Day[];
};

export type TaskActiveResponseType = {
  id: string;
  days: Day[];
};
