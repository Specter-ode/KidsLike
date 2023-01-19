import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes: React.FC = () => {
  const isAuth = false;

  return <>{isAuth ? <Outlet /> : <Navigate to="/auth" />}</>;
};

export default PrivateRoutes;
