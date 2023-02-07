import AuthContent from '../../components/AuthContent/AuthConten';
import Container from '../../components/Container/Container';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <section className="w-full py-[40px] sTablet:pb-[60px] sLaptop:pb-[100px]">
      <Container>
        <AuthContent>
          <RegisterForm />
        </AuthContent>
      </Container>
    </section>
  );
};

export default RegisterPage;
