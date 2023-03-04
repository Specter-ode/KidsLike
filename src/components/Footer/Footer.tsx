import authTablet1x from '../../assets/img/auth/auth-tablet-1x.png';
import authTablet2x from '../../assets/img/auth/auth-tablet-2x.png';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useWindowDimensions from '../../services/hooks/useDimensions';
import text from './text.json';
import { useAppSelector } from '../../redux/hooks';

const Footer: React.FC = () => {
  const { lang } = useAppSelector(store => store.auth);
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();
  const authPage = pathname === '/register' || pathname === '/login';
  const isLaptopAuthPage = authPage && width >= 1280;
  return (
    <footer
      className={`${isLaptopAuthPage && 'mt-[-56px]'}  ${
        authPage ? 'mt-0 mb-0' : 'mt-[20x] mb-[20px]'
      } hidden sTablet:mt-[20px] sTablet:flex sTablet:flex-col sTablet:items-center sLaptop:mx-auto sLaptop:items-end sLaptop:px-[20px]`}
    >
      <div className="flex ">
        <Logo
          logoTextStyles="mr-2 text-xs font-normal text-second-color hover:text-third-color hover:font-medium transition duration-500"
          logoIconStyles="w-[10px] h-[12px]"
        />
        <p className="ml-3 border-l-2 border-line-color pl-3 text-xs font-normal text-second-color">
          {text[lang].motto}
        </p>
        <p className="ml-3 border-l-2 border-line-color pl-3 text-xs font-normal text-second-color">2023</p>
      </div>
      {authPage && (
        <img
          className="mt-[20px] hidden w-[768px] sTablet:block sLaptop:hidden"
          src={authTablet1x}
          srcSet={`${authTablet1x} 1x, ${authTablet2x} 2x`}
          alt="Welcome. Parent and kids make homework together"
          width={768}
        />
      )}
    </footer>
  );
};

export default Footer;
