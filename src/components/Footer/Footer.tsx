import { useLocation } from 'react-router-dom';
import imageURL from '../../assets/img/hero/img-2.png';
import Logo from '../Logo/Logo';

const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const imageVision = pathname === '/register' || pathname === '/login';
  return (
    <footer className="hidden sTablet:flex sTablet:flex-col sTablet:items-center sLaptop:mx-auto sLaptop:max-w-[1280px] sLaptop:items-end sLaptop:px-[20px]">
      <div className="flex ">
        <Logo
          logoTextStyles="mr-2 text-xs font-normal text-second-color hover:text-third-color hover:font-medium transition duration-500"
          logoIconStyles="w-[10px] h-[12px]"
        />
        <p className="ml-3 border-l-2 border-line-color pl-3 text-xs font-normal text-second-color">
          Делаем жизнь родителей и детей изи :)
        </p>
        <p className="ml-3 border-l-2 border-line-color pl-3 text-xs font-normal text-second-color">2023</p>
      </div>
      <p className="sLaptop:hidden">IMAGES</p>
      {imageVision && <img className="w-[280px]" src={imageURL} alt="game" width={320} />}
    </footer>
  );
};

export default Footer;
