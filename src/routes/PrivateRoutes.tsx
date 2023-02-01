import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const PrivateRoutes: React.FC = () => {
  const isAuth = useAppSelector(store => store.auth.isAuth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/register" />}</>;
};

export default PrivateRoutes;
