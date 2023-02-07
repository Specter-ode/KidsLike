import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { useAppSelector } from '../redux/hooks';

const Layout: React.FC = () => {
  const { isAuth } = useAppSelector(store => store.auth);
  const { pathname } = useLocation();
  console.log('pathname: ', pathname);
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === '/') {
      console.log(pathname === '/');
      navigate('/register');
    }
  }, [isAuth, navigate, pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
