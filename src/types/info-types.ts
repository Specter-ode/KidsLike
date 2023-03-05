export interface IDay {
  date: string;
  isActive: boolean;
  isCompleted: boolean;
}

export interface ITask {
  _id: string;
  title: string;
  reward: number;
  imageUrl: string;
  childId: string;
  days: IDay[];
}

export interface IGift {
  _id: string;
  title: string;
  price: number;
  isPurchased: boolean;
  imageUrl: string;
  childId: string;
}

export interface IChild {
  name: string;
  gender: 'male' | 'female';
  balance: number;
  rewardsGained: number;
  rewardsPlanned: number;
  tasks: ITask[];
  gifts: IGift[];
  _id: string;
}

export interface IInfoState {
  children: IChild[];
  currentChild: IChild;
  selectedDay: string;
  purchasedGifts: string[];
  isLoading: boolean;
  error: string | null;
}

export interface INewChildData {
  name: string;
  gender: 'male' | 'female';
  lang: 'ru-RU' | 'uk-UA';
}

export interface ITaskData {
  data: {
    title: string;
    reward: number;
    avatar: File | null;
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
    avatar: File | null;
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
    avatar: File | null;
  };
  childId: string;
}

export interface IEditGiftData {
  data: {
    title: string;
    price: number;
    avatar: File | null;
  };
  giftId: string;
}

export interface IRemoveGiftResponse {
  giftId: string;
  childId: string;
}

export interface IBuyGiftsResponse {
  childId: string;
  balance: number;
  gifts: IGift[];
}

export interface IBuyGiftsData {
  childId: string;
  giftIds: string[];
}
