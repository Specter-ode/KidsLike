import LoginForm from '../../components/LoginForm/LoginForm';
import Container from '../../components/Container/Container';
import AuthContent from '../../components/AuthContent/AuthConten';
import SocialAuth from '../../components/SocialAuth/SocialAuth';

const LoginPage: React.FC = () => {
  return (
    <section className="w-full py-[40px] sTablet:pb-[60px] sLaptop:pb-[100px]">
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
