import Header from './components/Header/Header';
import PageRoutes from './routes/PageRoutes';

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getCurrentUser } from './redux/auth/auth-operations';
import { useEffect } from 'react';
import { setToken } from './services/api/auth';

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
  }, [isAuth, token]);
  return (
    <div className="pb-[64px] sTablet:pb-[40px]">
      <Header />
      <PageRoutes />
      <Footer />
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" theme="colored" transition={Zoom} />
    </div>
  );
};

export default App;
