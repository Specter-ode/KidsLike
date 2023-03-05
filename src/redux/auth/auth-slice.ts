import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleRegistration, handleLogin, handleLogout, handleRefresh, getUser } from './auth-operations';
import { IAuthState, IResponseError, ISocialAuthAction } from '../../types/auth-types';

const initialState: IAuthState = {
  id: '',
  username: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  sid: '',
  startWeekDate: '',
  endWeekDate: '',
  lang: 'uk-UA',
  isAuth: false,
  isLoading: false,
  isModal: false,
  isFormModal: false,
  error: null,
  redirectToLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSidAndTokens: (store, { payload }: PayloadAction<ISocialAuthAction>) => {
      console.log('setSidAndTokens payload: ', payload);
      store.accessToken = payload.accessToken;
      store.refreshToken = payload.refreshToken;
      store.sid = payload.sid;
    },
    setModalStatus: (store, { payload }: PayloadAction<boolean>) => {
      store.isModal = payload;
    },
    setFormModalStatus: (store, { payload }: PayloadAction<boolean>) => {
      store.isFormModal = payload;
    },
    clearRedirectToLogin: store => {
      store.redirectToLogin = false;
    },
    setIsAuth: (store, { payload }: PayloadAction<boolean>) => {
      store.isAuth = payload;
    },
    setLanguage: (store, { payload }: PayloadAction<'ru-RU' | 'uk-UA'>) => {
      store.lang = payload;
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
        store.isAuth = true;
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

export const { setSidAndTokens, setModalStatus, setFormModalStatus, clearRedirectToLogin, setIsAuth, setLanguage } =
  authSlice.actions;
export default authSlice.reducer;
