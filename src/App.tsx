import { Suspense } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getCurrentUser } from './redux/auth/auth-operations';
import { useEffect } from 'react';
import { setToken } from './services/api/auth';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import Root from './routes/Root';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector(store => store.auth);

  useEffect(() => {
    console.log('token: ', token);
    console.log('isAuth: ', isAuth);
    console.log('!isAuth && token: ', !isAuth && token);
    if (!isAuth && token) {
      setToken(token);
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuth, token]);

  const router = createBrowserRouter(createRoutesFromElements(Root), { basename: '/' });
  return (
    <div className="pb-[64px] sTablet:pb-[40px]">
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" theme="colored" transition={Zoom} />
    </div>
  );
};

export default App;
