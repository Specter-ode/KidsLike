import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { useAppSelector } from '../redux/hooks';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
// import { useSelector } from 'react-redux';

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const PlanningPage = lazy(() => import('../pages/PlanningPage/PlanningPage'));
const AwardsPage = lazy(() => import('../pages/AwardsPage/AwardsPage'));

const PageRoutes: React.FC = () => {
  const isAuth = useAppSelector(store => store.auth.isAuth);

  const correctComponent = isAuth ? <MainPage /> : <RegisterPage />;
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route index path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<PrivateRoutes />}>
          <Route index path="/main" element={<MainPage />} />
          <Route path="/planning" element={<PlanningPage />} />
          <Route path="/awards" element={<AwardsPage />} />
        </Route>
        <Route path="*" element={correctComponent} />
      </Routes>
    </Suspense>
  );
};

export default PageRoutes;
