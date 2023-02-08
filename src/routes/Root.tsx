import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import PrivateLayout from './PrivateLayout';
import AuthLayout from './AuthLayout';
import Layout from './Layout';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Loader from '../components/Loader/Loader';

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const PlanningPage = lazy(() => import('../pages/PlanningPage/PlanningPage'));
const AwardsPage = lazy(() => import('../pages/AwardsPage/AwardsPage'));

// const PageRoutes: React.FC = () => {

//   const correctComponent = isAuth ? <MainPage /> : <RegisterPage />;
//   return (
//     <Suspense fallback={<Loader />}>
//       <Routes>
//         <Route path="/" element={<PublicRoutes />}>
//           <Route index path="/register" element={<RegisterPage />} />
//           <Route path="/login" element={<LoginPage />} />
//         </Route>
//         <Route path="/" element={<PrivateRoutes />}>
//           <Route index path="/main" element={<MainPage />} />
//           <Route path="/planning" element={<PlanningPage />} />
//           <Route path="/awards" element={<AwardsPage />} />
//         </Route>
//         <Route path="*" element={correctComponent} />
//        </Routes>
//     </Suspense>
//   );
// };

// export default PageRoutes;

const Root = (
  <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
    <Route element={<AuthLayout />}>
      <Route
        path="register"
        element={
          <Suspense fallback={<Loader />}>
            <RegisterPage />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        }
      />
    </Route>
    <Route element={<PrivateLayout />}>
      <Route
        path="main"
        element={
          <Suspense fallback={<Loader />}>
            <MainPage />
          </Suspense>
        }
      />
      <Route
        path="planning"
        element={
          <Suspense fallback={<Loader />}>
            <PlanningPage />
          </Suspense>
        }
      />
      <Route
        path="awards"
        element={
          <Suspense fallback={<Loader />}>
            <AwardsPage />
          </Suspense>
        }
      />
    </Route>
  </Route>
);

export default Root;
