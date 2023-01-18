// import ps from '../../assets/img/hero/img-2.png';
import Logo from '../Logo/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="mb-[40px] hidden sTablet:flex sTablet:flex-col sTablet:items-center sLaptop:mx-auto sLaptop:max-w-[1280px] sLaptop:items-end sLaptop:px-[20px]">
      <div className="flex ">
        <Logo logoTextStyles="mr-2 text-xs font-normal text-second-color" logoIconStyles="w-2" />
        <p className="ml-3 border-l-2 border-line-color pl-3 text-xs font-normal text-second-color">
          Делаем жизнь родителей и детей изи :)
        </p>
        <p className="ml-3 border-l-2 border-line-color pl-3 text-xs font-normal text-second-color">2023</p>
      </div>
      <p className="sLaptop:hidden">IMAGES</p>
      {/* <img className="w-full" src={ps} alt="game" width={320} /> */}
    </footer>
  );
};

export default Footer;
