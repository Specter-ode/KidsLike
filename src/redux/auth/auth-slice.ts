import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleRegistration, handleLogin, handleLogout, getCurrentUser } from './auth-operations';
import { InitialStateType, ResponseError, User, Week } from './types';

const initialState:InitialStateType = {
  user: {} as User,
  week: {} as Week,
  token: '',
  isAuth: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // updateModalStatus: (store, { payload }) => {
    //   store.showModal = payload;
    // },
    // setAccessToken: (store, { payload }) => {
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
      .addCase(handleRegistration.fulfilled, (store, { payload }) => {
        store.user = payload.user;
        store.week = payload.week
        store.token = payload.token
        store.isLoading = false;
        store.isAuth = true;
      })

      .addCase(handleLogin.fulfilled, (store, { payload }) => {
        store.user = payload.user;
        store.week = payload.week
        store.token = payload.token
        store.isLoading = false;
        store.isAuth = true;
      })


      .addCase(getCurrentUser.fulfilled, (store, { payload }) => {
        console.log('payload: ', payload);
        store.user = payload.user;
        store.week = payload.week
        store.isLoading = false;
        store.isAuth = true;
      })
      .addCase(handleLogout.fulfilled, () => ({ ...initialState }))

      .addMatcher(isError, (store, action: PayloadAction<ResponseError>) => {
        store.error = action.payload.response.data.message;
        store.isLoading = false;
      })
      .addMatcher(Loading, (store, action: PayloadAction<string>) => {
        store.error = action.payload;
        store.isLoading = false;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
function Loading (action: AnyAction) {
  return action.type.endsWith('pending');
}

// export const { updateModalStatus, setAccessToken, setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
