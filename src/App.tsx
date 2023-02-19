import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getUser } from './redux/auth/auth-operations';
import { useEffect } from 'react';
import { setToken } from './services/api/auth';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import Root from './routes/Root';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth, accessToken } = useAppSelector(store => store.auth);

  useEffect(() => {
    if (!isAuth && accessToken) {
      setToken(accessToken);
      dispatch(getUser());
    }
  }, [dispatch, isAuth, accessToken]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUser());
    }
  }, [dispatch, isAuth]);

  const router = createBrowserRouter(createRoutesFromElements(Root), { basename: '/' });
  return (
    <div className="min-h-[100vh] pb-[66px] sTablet:pb-[40px]">
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" theme="colored" transition={Zoom} />
    </div>
  );
};

export default App;
