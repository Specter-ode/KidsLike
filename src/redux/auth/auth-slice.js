import { createSlice } from '@reduxjs/toolkit';
import { handleRegistration, handleLogin, handleLogout, getCurrentUser } from './auth-operations';

const initialState = {
  user: {},
  accessToken: '',
  refreshToken: '',
  isAuth: false,
  isLoading: false,
  isError: null,
  showModal: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateModalStatus: (store, { payload }) => {
      store.showModal = payload;
    },
    setAccessToken: (store, { payload }) => {
      store.accessToken = payload;
    },
    setRefreshToken: (store, { payload }) => {
      store.refreshToken = payload;
    },
    // setPasswordStatus: (store, { payload }) => {
    //   store.passwordStatus = payload;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(handleRegistration.pending, store => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(handleRegistration.fulfilled, (store, { payload }) => {
        store.user = payload.user;
        store.isLoading = false;
      })
      .addCase(handleRegistration.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.isError = payload;
      })
      .addCase(handleLogin.pending, store => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(handleLogin.fulfilled, (store, { payload }) => {
        store.user = payload.user;
        store.accessToken = payload.accessToken;
        store.isLoading = false;
        store.isAuth = true;
        store.refreshToken = payload.refreshToken;
      })
      .addCase(handleLogin.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.isError = payload;
      })
      .addCase(getCurrentUser.pending, store => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(getCurrentUser.fulfilled, (store, { payload }) => {
        store.user = payload.user;
        store.isLoading = false;
        store.isLogin = true;
      })
      .addCase(getCurrentUser.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.isError = payload;
      })
      .addCase(handleLogout.pending, store => {
        store.isLoading = true;
        store.isError = null;
      })
      .addCase(handleLogout.fulfilled, () => ({ ...initialState }))
      .addCase(handleLogout.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.isError = payload;
      });
  },
});

export const { updateModalStatus, setAccessToken, setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
