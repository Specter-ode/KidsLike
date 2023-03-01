import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContent from '../../components/AuthContent/AuthConten';
import Container from '../../components/Container/Container';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import SocialAuth from '../../components/SocialAuth/SocialAuth';
import { useAppSelector } from '../../redux/hooks';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { redirectToLogin } = useAppSelector(state => state.auth);
  useEffect(() => {
    if (redirectToLogin) {
      navigate('/login');
    }
  }, [navigate, redirectToLogin]);

  return (
    <section className="min-h-[calc(100vh-130px)] w-full py-[40px] sTablet:min-h-[calc(100vh-335px)] sLaptop:min-h-[calc(100vh-64px)] sLaptop:pb-0 sLaptop:pt-[20px]">
      <Container>
        <AuthContent>
          <div className="sTablet:mx-auto sTablet:w-[394px] sTablet:px-[32px] sTablet:py-[40px] sTablet:shadow-base ">
            <SocialAuth />
            <RegisterForm />
          </div>
        </AuthContent>
      </Container>
    </section>
  );
};

export default RegisterPage;
