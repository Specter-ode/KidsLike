import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const AuthRoutes: React.FC = () => {
  const isAuth = useAppSelector(store => store.auth.isAuth);
  console.log('AuthRoutes isAuth: ', isAuth);

  return <>{isAuth ? <Navigate to="/main" /> : <Outlet />}</>;
};

export default AuthRoutes;
