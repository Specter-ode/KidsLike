import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes: React.FC = () => {
  const isAuth = false;

  return <>{isAuth ? <Navigate to="/main" /> : <Outlet />}</>;
};

export default PublicRoutes;
