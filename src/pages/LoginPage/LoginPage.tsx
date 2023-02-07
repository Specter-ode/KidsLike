import LoginForm from '../../components/LoginForm/LoginForm';
import Container from '../../components/Container/Container';
import AuthContent from '../../components/AuthContent/AuthConten';

const LoginPage: React.FC = () => {
  return (
    <section className="w-full py-[40px] sTablet:pb-[60px] sLaptop:pb-[100px]">
      <Container>
        <AuthContent>
          <LoginForm />
        </AuthContent>
      </Container>
    </section>
  );
};

export default LoginPage;
