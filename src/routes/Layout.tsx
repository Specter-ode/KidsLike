import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Modal from '../components/Modal/Modal';
import NewTaskForm from '../components/NewTaskForm/NewTaskForm';
import { setTaskFormModalStatus } from '../redux/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Layout: React.FC = () => {
  const istaskFormModal = useAppSelector(store => store.auth.taskFormModal);
  const isAuth = useAppSelector(store => store.auth.isAuth);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === '/') {
      navigate('/register');
    }
  }, [isAuth, navigate, pathname]);

  const dispatch = useAppDispatch();
  const onCloseTaskFormModal = () => {
    console.log();
    dispatch(setTaskFormModalStatus(false));
  };
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-130px)] sTablet:min-h-[calc(100vh-144px)]">
        <Outlet />
      </main>
      <Footer />
      {istaskFormModal && (
        <Modal onClose={onCloseTaskFormModal}>
          <NewTaskForm />
        </Modal>
      )}
    </>
  );
};

export default Layout;
