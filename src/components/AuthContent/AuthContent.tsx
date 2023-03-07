import authDesktop1x from '../../assets/img/auth/auth-desktop-1x.png';
import authDesktop2x from '../../assets/img/auth/auth-desktop-2x.png';
import { useAppSelector } from '../../redux/hooks';
import useWindowDimensions from '../../services/hooks/useDimensions';
import text from './text.json';

interface IProps {
  children: React.ReactNode;
}
const AuthContent: React.FC<IProps> = ({ children }) => {
  const { width } = useWindowDimensions();
  const { lang } = useAppSelector(store => store.auth);
  return (
    <div className="sLaptop:flex sLaptop:justify-between sLaptop:pr-[120px] sLaptop:pl-[16px]">
      {width >= 1280 && (
        <div className="hidden sLaptop:block sLaptop:h-full">
          <img
            className="h-full w-full"
            src={authDesktop1x}
            srcSet={`${authDesktop1x} 1x, ${authDesktop2x} 2x`}
            alt="Welcome. Parent and kids make homework together"
            width={580}
          />
        </div>
      )}
      <div className="sLaptop:mt-[20px]">
        <h2 className="mb-[32px] text-center text-[18px] font-semibold text-main-color sTablet:text-[28px] sLaptop:text-left">
          {text[lang].makeTasks}
          <br /> {text[lang].getAwards}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthContent;
