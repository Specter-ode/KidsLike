export interface IDay {
  date: string;
  isCompleted: string;
}

export interface IHabit {
  days: IDay[];
  _id: string;
  name: string;
  rewardPerDay: number;
  childId: string;
}

export interface ITask {
  _id: string;
  name: string;
  reward: number;
  isCompleted: string;
  childId: string;
  daysToComplete: number;
  __v: number;
}

export interface IGift {
  _id: string;
  name: string;
  price: number;
  isPurchased: boolean;
  imageUrl: string;
  childId: string;
  __v: number;
}

export interface IChild {
  rewards: number;
  habits: IHabit[];
  tasks: ITask[];
  gifts: IGift[];
  _id: string;
  name: string;
  gender: string;
  __v: number;
}

export interface IResponseError {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}

export interface IInfoState {
  children: IChild[];
  isLoading: boolean;
  error: string | null;
}

export interface INewChildData {
  name: string;
  gender: 'male' | 'female';
}
