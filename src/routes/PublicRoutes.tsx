import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const PublicRoutes: React.FC = () => {
  const isAuth = useAppSelector(store => store.auth.isAuth);

  return <>{isAuth ? <Navigate to="/main" /> : <Outlet />}</>;
};

export default PublicRoutes;
