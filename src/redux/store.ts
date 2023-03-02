import { configureStore, ThunkAction, Action, createAsyncThunk, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import infoReducer from './info/info-slice';
import { persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken', 'sid'],
};

const infoPersistConfig = {
  key: 'info',
  storage,
  whitelist: ['currentChild'],
};
const persistedAuth = persistReducer(authPersistConfig, authReducer);
const persistedInfo = persistReducer(infoPersistConfig, infoReducer);
const rootReducer = combineReducers({
  auth: persistedAuth,
  info: persistedInfo,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// export const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState;
//   dispatch: AppDispatch;
//   rejectValue: string;
// }>();

export const persistor = persistStore(store);
