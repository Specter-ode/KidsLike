import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser } from '../auth/auth-operations';
import { addChild } from './info-operations';
import { IChild, IInfoState, IResponseError } from './info-types';

const initialState: IInfoState = {
  children: [] as IChild[],
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.fulfilled, (store, { payload }) => {
        store.children = { ...payload.children };
        store.isLoading = false;
      })
      .addCase(addChild.fulfilled, (store, { payload }) => {
        store.children = [...store.children, payload];
        store.isLoading = false;
      })

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
