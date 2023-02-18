export interface IDay {
  date: string;
  isActive: boolean;
  isCompleted: string;
}

export interface ITask {
  id: string;
  title: string;
  reward: number;
  imageUrl: string;
  childId: string;
  days: IDay[];
}

export interface IGift {
  id: string;
  title: string;
  price: number;
  isPurchased: boolean;
  imageUrl: string;
  childId: string;
}

export interface IChild {
  balance: number;
  rewardsGained: number;
  rewardsPlanned: number;
  tasks: ITask[];
  gifts: IGift[];
  id: string;
  name: string;
  gender: 'male' | 'female';
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
  currentChild: IChild;
  isLoading: boolean;
  error: string | null;
}

export interface INewChildData {
  name: string;
  gender: 'male' | 'female';
}

export interface ITaskData {
  data: {
    title: string;
    reward: number;
    avatar: string;
  };
  childId: string;
}

export interface ITaskActiveStatusData {
  days: IDay[];
  taskId: string;
}

export interface ITaskActiveStatusResponse {
  rewardsPlanned: number;
  updatedTask: ITask;
}

export interface ITaskCompletedStatusData {
  date: string;
  taskId: string;
}

export interface ITaskCompletedStatusResponse {
  rewardsGained: number;
  balance: number;
  updatedTask: ITask;
}

export interface IEditTaskData {
  data: {
    title: string;
    reward: number;
    avatar: string;
  };
  taskId: string;
}

export interface IRemoveTaskResponse {
  taskId: string;
  childId: string;
}

export interface IGiftData {
  data: {
    title: string;
    price: number;
    avatar: string;
  };
  childId: string;
}

export interface IEditGiftData {
  data: {
    title: string;
    price: number;
    avatar: string;
  };
  giftId: string;
}

export interface IRemoveGiftResponse {
  giftId: string;
  childId: string;
}

export interface IBuyGiftResponse {
  purchasedGift: IGift;
  updatedBalance: number;
}
