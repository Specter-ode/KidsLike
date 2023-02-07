import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleRegistration, handleLogin, handleLogout, handleRefresh, getUser } from './auth-operations';
import { IAuthState, IResponseError } from './auth-types';

const initialState: IAuthState = {
  id: '',
  username: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  sid: '',
  isAuth: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // updateModalStatus: (store, { payload }: PayloadAction<boolean>) => {
    //   store.showModal = payload;
    // },
    // setAccessToken: (store, { payload }: PayloadAction<string>) => {
    //   store.accessToken = payload;
    // },
    // setRefreshToken: (store, { payload }) => {
    //   store.refreshToken = payload;
    // },
    // setPasswordStatus: (store, { payload }) => {
    //   store.passwordStatus = payload;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(handleRegistration.fulfilled, store => {
        store.isLoading = false;
      })

      .addCase(handleLogin.fulfilled, (store, { payload }) => {
        store.accessToken = payload.accessToken;
        store.refreshToken = payload.refreshToken;
        store.sid = payload.sid;
        store.email = payload.data.email;
        store.username = payload.data.username;
        store.id = payload.data.id;
        store.isLoading = false;
        store.isAuth = true;
      })

      .addCase(handleRefresh.fulfilled, (store, { payload }) => {
        store.accessToken = payload.accessToken;
        store.refreshToken = payload.refreshToken;
        store.sid = payload.newSid;
        store.isLoading = false;
      })

      .addCase(getUser.fulfilled, (store, { payload }) => {
        store.email = payload.email;
        store.username = payload.username;
        store.id = payload.id;
        store.isLoading = false;
      })

      .addCase(handleLogout.fulfilled, () => ({ ...initialState }))

      .addMatcher(isError, (store, action: PayloadAction<IResponseError>) => {
        store.error = action.payload.response.data.message;
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

// export const { updateModalStatus, setAccessToken, setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
