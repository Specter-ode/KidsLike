import AuthForm from '../../components/AuthForm/AuthForm';
import Container from '../../components/Container/Container';
import Footer from '../../components/Footer/Footer';

const AuthPage: React.FC = () => {
  return (
    <>
      <main className="w-full">
        <Container>
          <div className="relative sLaptop:flex sLaptop:justify-end">
            <div className="absolute top-[20px] left-0 hidden w-[576px] sLaptop:block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa facere earum beatae! Magni officia voluptas
              dolorem veniam quo perferendis reprehenderit inventore soluta hic, quia provident molestias earum, sit
              reiciendis? Suscipit molestias eaque, deleniti tempore ex nulla voluptatibus blanditiis quisquam, cumque
              consectetur tenetur eius dolores cupiditate magni ipsam vel, vero repellendus?
            </div>
            <div className="py-[40px] sTablet:py-[60px]">
              <h2 className="mb-[32px] text-center text-[18px] font-semibold text-main-color sTablet:text-[28px] sLaptop:text-left sLaptop:text-[30px]">
                Выполняй задания,
                <br /> получи классные призы!
              </h2>
              <AuthForm />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default AuthPage;
