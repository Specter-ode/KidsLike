import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Modal from '../components/Modal/Modal';
import NewTaskForm from '../components/NewTaskForm/NewTaskForm';
import { getUser } from '../redux/auth/auth-operations';
import { setSidAndTokens, setTaskFormModalStatus } from '../redux/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setToken } from '../services/api/auth';

const Layout: React.FC = () => {
  const { isAuth, accessToken, taskFormModal } = useAppSelector(store => store.auth);
  const [searchParams] = useSearchParams();
  const accessTokenFromURL = searchParams.get('accessToken');
  const refreshTokenFromURL = searchParams.get('refreshToken');
  const sidFromURL = searchParams.get('sid');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessTokenFromURL && refreshTokenFromURL && sidFromURL) {
      dispatch(
        setSidAndTokens({ accessToken: accessTokenFromURL, refreshToken: refreshTokenFromURL, sid: sidFromURL })
      );
    }
  }, [accessTokenFromURL, refreshTokenFromURL, dispatch, sidFromURL]);

  useEffect(() => {
    if (accessToken && !isAuth) {
      setToken(accessToken);
      dispatch(getUser());
    }
  }, [dispatch, isAuth, accessToken]);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === '/') {
      navigate('/register');
    }
  }, [isAuth, navigate, pathname]);

  const onCloseTaskFormModal = () => {
    dispatch(setTaskFormModalStatus(false));
  };

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {taskFormModal && (
        <Modal onClose={onCloseTaskFormModal}>
          <NewTaskForm />
        </Modal>
      )}
    </>
  );
};

export default Layout;
