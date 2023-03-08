import { useLocation } from 'react-router-dom';
import Spinner from 'react-spinners/CircleLoader';
import useWindowDimensions from '../../services/hooks/useDimensions';

interface IProps {
  size?: number;
}

const Loader: React.FC<IProps> = ({ size = 250 }) => {
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();
  console.log('pathname: ', pathname);
  const registerPage = pathname === '/register';
  const loginPage = pathname === '/login';
  const isLaptopAuthPage = (registerPage || loginPage) && width >= 1280;
  return (
    <div
      className={`${
        isLaptopAuthPage
          ? 'sLaptop:min-h-[calc(100vh-64px)]'
          : registerPage
          ? 'onlyTablet:h-[707px]'
          : loginPage
          ? 'onlyTablet:h-[648px]'
          : 'sTablet:min-h-[calc(100vh-120px)]'
      } flex items-center justify-center lessTablet:min-h-[calc(100vh-130px)] `}
    >
      <Spinner color="#ff9406" loading size={size} aria-label="Loading Spinner" speedMultiplier={0.7} />
    </div>
  );
};

export default Loader;
