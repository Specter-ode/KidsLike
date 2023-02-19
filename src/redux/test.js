// import { lazy, Suspense } from 'react';
// import { Route } from 'react-router-dom';
// import PrivateLayout from './PrivateLayout';
// import AuthLayout from './AuthLayout';
// import Layout from './Layout';
// import ErrorPage from '../pages/ErrorPage/ErrorPage';
// import Loader from '../components/Loader/Loader';
// import { configureStore, ThunkAction, Action, createAsyncThunk, combineReducers } from '@reduxjs/toolkit';
// import authReducer from './auth/auth-slice';
// import infoReducer from './info/info-slice';
// import { persistReducer } from 'redux-persist';
// import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import persistStore from 'redux-persist/es/persistStore';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import axios, {AxiosError} from 'axios';
// import { toast } from 'react-toastify';
// import { ToastContainer, Zoom } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect } from 'react';
// import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
// const authPersistConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['accessToken', 'sid'],
// };
// const persistedAuth = persistReducer(authPersistConfig, authReducer);

// const rootReducer = combineReducers({
//   auth: persistedAuth,
//   info: infoReducer,
// });

// interface IErrorResponse {
//   message: string;
// }
// const store = configureStore({
//   reducer: rootReducer,

//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// type AppDispatch = typeof store.dispatch;
// type RootState = ReturnType<typeof store.getState>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState;
//   dispatch: AppDispatch;
//   rejectValue: string;
//   extra: { s: string; n: number };
// }>();
// interface IDay {
//     date: string;
//     isActive: boolean;
//     isCompleted: boolean;
//   }

//   interface ITask {
//     id: string;
//     title: string;
//     reward: number;
//     imageUrl: string;
//     childId: string;
//     days: IDay[];
//   }

//   interface IGift {
//     id: string;
//     title: string;
//     price: number;
//     isPurchased: boolean;
//     imageUrl: string;
//     childId: string;
//   }
// interface IChild {
//     balance: number;
//     rewardsGained: number;
//     rewardsPlanned: number;
//     tasks: ITask[];
//     gifts: IGift[];
//     id: string;
//     name: string;
//     gender: 'male' | 'female';
//   }
// interface IUserResponse {
//   email: string;
//   username: string;
//   id: string;
//   startWeekDate: string;
//   endWeekDate: string;
//   children: IChild[];
// }

// const instance = axios.create({
//   baseURL: 'http://localhost:4000/',
// });
// const setToken = (token: string = ''): void => {
//     if (token) {
//       instance.defaults.headers['Authorization'] = `Bearer ${token}`;
//     } else {
//       instance.defaults.headers['Authorization'] = '';
//     }
//   };

// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// const getCurrentUser = async (): Promise<IUserResponse> => {
//   const result = await instance.get<IUserResponse>('/user');
//   return result.data;
// };
// const getUser = createAppAsyncThunk<IUserResponse, undefined, { rejectValue: IErrorResponse; state: RootState }>(
//   'auth/getUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const result = await getCurrentUser();
//       console.log('getCurrentUser result: ', result);
//       return result;
//     } catch (error) {
//       const err = error as AxiosError<IErrorResponse>;
//       if (!err.response) {
//         throw error;
//       } else {
//         toast.error(`Не удалось получить данные о пользователе`);
//         return rejectWithValue({ message: err.response.data.message });
//       }
//     }
//   },
//   {
//     condition: (_, { getState }) => {
//       const state = getState();
//       if (!state.auth.accessToken) {
//         return false;
//       }
//       setToken(state.auth.accessToken);
//       return true;
//     },
//   }
// );

// const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
// const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
// const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
// const PlanningPage = lazy(() => import('../pages/PlanningPage/PlanningPage'));
// const AwardsPage = lazy(() => import('../pages/AwardsPage/AwardsPage'));

// const Root = (
//   <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
//     <Route element={<AuthLayout />}>
//       <Route
//         path="register"
//         element={
//           <Suspense fallback={<Loader />}>
//             <RegisterPage />
//           </Suspense>
//         }
//       />
//       <Route
//         path="login"
//         element={
//           <Suspense fallback={<Loader />}>
//             <LoginPage />
//           </Suspense>
//         }
//       />
//     </Route>
//     <Route element={<PrivateLayout />}>
//       <Route
//         path="main"
//         element={
//           <Suspense fallback={<Loader />}>
//             <MainPage />
//           </Suspense>
//         }
//       />
//       <Route
//         path="planning"
//         element={
//           <Suspense fallback={<Loader />}>
//             <PlanningPage />
//           </Suspense>
//         }
//       />
//       <Route
//         path="awards"
//         element={
//           <Suspense fallback={<Loader />}>
//             <AwardsPage />
//           </Suspense>
//         }
//       />
//     </Route>
//   </Route>
// );

// const App: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { isAuth, accessToken } = useAppSelector(store => store.auth);

//   useEffect(() => {
//     if (!isAuth && accessToken) {
//       setToken(accessToken);
//       dispatch(getUser());
//     }
//   }, [dispatch, isAuth, accessToken]);

//   useEffect(() => {
//     if (isAuth) {
//       dispatch(getUser());
//     }
//   }, [isAuth]);

//   const router = createBrowserRouter(createRoutesFromElements(Root), { basename: '/' });
//   return (
//     <div className="min-h-[100vh] pb-[66px] sTablet:pb-[40px]">
//       <RouterProvider router={router} />
//       <ToastContainer autoClose={2000} hideProgressBar position="top-center" theme="colored" transition={Zoom} />
//     </div>
//   );
// };

// export default App;

// getUser() - Error: 'No overload matches this call.';
