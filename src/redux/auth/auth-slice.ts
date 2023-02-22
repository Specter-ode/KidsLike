import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleRegistration, handleLogin, handleLogout, handleRefresh, getUser } from './auth-operations';
import { IAuthState, IResponseError } from '../../types/auth-types';
import { useNavigate } from 'react-router-dom';

const initialState: IAuthState = {
  id: '',
  username: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  sid: '',
  startWeekDate: '',
  endWeekDate: '',
  lang: 'ru',
  isAuth: false,
  isLoading: false,
  isModal: false,
  taskFormModal: false,
  error: null,
  redirectToLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setModalStatus: (store, { payload }: PayloadAction<boolean>) => {
      store.isModal = payload;
    },
    setTaskFormModalStatus: (store, { payload }: PayloadAction<boolean>) => {
      store.taskFormModal = payload;
    },
    clearRedirectToLogin: store => {
      store.redirectToLogin = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleRegistration.fulfilled, store => {
        store.isLoading = false;
        store.redirectToLogin = true;
      })

      .addCase(handleLogin.fulfilled, (store, { payload }) => {
        store.accessToken = payload.accessToken;
        store.refreshToken = payload.refreshToken;
        store.sid = payload.sid;
        store.email = payload.email;
        store.username = payload.username;
        store.id = payload.id;
        store.startWeekDate = payload.startWeekDate;
        store.endWeekDate = payload.endWeekDate;
        store.isLoading = false;
        store.isAuth = true;
      })

      .addCase(handleRefresh.fulfilled, (store, { payload }) => {
        store.accessToken = payload.accessToken;
        store.refreshToken = payload.refreshToken;
        store.sid = payload.sid;
        store.isLoading = false;
      })

      .addCase(getUser.fulfilled, (store, { payload }) => {
        store.email = payload.email;
        store.username = payload.username;
        store.id = payload.id;
        store.startWeekDate = payload.startWeekDate;
        store.endWeekDate = payload.endWeekDate;
        store.isLoading = false;
        store.isAuth = true;
      })

      .addCase(handleLogout.fulfilled, () => ({ ...initialState }))

      .addMatcher(isError, (store, action: PayloadAction<IResponseError>) => {
        store.error = action.payload.message;
        store.isLoading = false;
      })
      .addMatcher(Loading, store => {
        store.error = null;
        store.isLoading = true;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
function Loading(action: AnyAction) {
  return action.type.endsWith('pending');
}

export const { setModalStatus, setTaskFormModalStatus, clearRedirectToLogin } = authSlice.actions;
export default authSlice.reducer;
