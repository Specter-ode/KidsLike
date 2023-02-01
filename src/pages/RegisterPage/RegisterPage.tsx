import AuthForm from '../../components/AuthForm/AuthForm';
import Container from '../../components/Container/Container';
import { items } from './items';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage: React.FC = () => {
  return (
    <main className="w-full py-[40px] sTablet:pb-[60px] sLaptop:pb-[100px]">
      <Container>
        <div className="relative sLaptop:flex sLaptop:justify-end sLaptop:pr-[120px]">
          <div className="absolute top-[20px] left-0 hidden w-[576px] sLaptop:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa facere earum beatae! Magni officia voluptas
            dolorem veniam quo perferendis reprehenderit inventore soluta hic, quia provident molestias earum, sit
            reiciendis? Suscipit molestias eaque, deleniti tempore ex nulla voluptatibus blanditiis quisquam, cumque
            consectetur tenetur eius dolores cupiditate magni ipsam vel, vero repellendus?
          </div>
          <div>
            <h2 className="mb-[32px] text-center text-[18px] font-semibold text-main-color sTablet:text-[28px] sLaptop:text-left sLaptop:text-[30px]">
              Выполняй задания,
              <br /> получи классные призы!
            </h2>
            <AuthForm items={items} btnTitle="Зарегистрироваться" initialState={initialState} />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default RegisterPage;
