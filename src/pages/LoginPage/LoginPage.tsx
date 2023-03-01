import LoginForm from '../../components/LoginForm/LoginForm';
import Container from '../../components/Container/Container';
import AuthContent from '../../components/AuthContent/AuthConten';
import SocialAuth from '../../components/SocialAuth/SocialAuth';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearRedirectToLogin } from '../../redux/auth/auth-slice';
import { useEffect } from 'react';

const LoginPage: React.FC = () => {
  const { redirectToLogin } = useAppSelector(store => store.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (redirectToLogin) {
      dispatch(clearRedirectToLogin());
    }
  }, [dispatch, redirectToLogin]);

  return (
    <section className="min-h-[calc(100vh-130px)] w-full py-[40px] sTablet:min-h-[calc(100vh-335px)] sLaptop:min-h-[calc(100vh-64px)] sLaptop:pb-0 sLaptop:pt-[20px]">
      <Container>
        <AuthContent>
          <div className="sTablet:mx-auto sTablet:w-[394px] sTablet:px-[32px] sTablet:py-[40px] sTablet:shadow-base ">
            <SocialAuth />
            <LoginForm />
          </div>
        </AuthContent>
      </Container>
    </section>
  );
};

export default LoginPage;
