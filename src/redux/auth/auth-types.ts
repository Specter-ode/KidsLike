import { IChild } from '../info/info-types';

export interface IRegisterData {
  username: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  sid: string;
  email: string;
  username: string;
  id: string;
  startWeekDate: string;
  endWeekDate: string;
  children: IChild[];
}

export interface IRefreshData {
  sid: string;
}

export interface ILogoutData {
  userId: string;
}
export interface IRefreshResponse {
  accessToken: string;
  refreshToken: string;
  sid: string;
}

export interface IResponseError {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}

export interface IAuthState {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  startWeekDate: string;
  endWeekDate: string;
  sid: string;
  isAuth: boolean;
  isLoading: boolean;
  isModal: boolean;
  taskFormModal: boolean;
  error: string | null;
}

export interface IUserResponse {
  email: string;
  username: string;
  id: string;
  startWeekDate: string;
  endWeekDate: string;
  children: IChild[];
}
