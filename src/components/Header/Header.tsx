import { Link } from 'react-router-dom';
import useWindowDimensions from '../../services/hooks/useDimensions';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import UserInfo from './UserInfo/UserInfo';
import UserNav from './UserNav/UserNav';

const Header: React.FC = () => {
  const { width } = useWindowDimensions();
  const isAuth = true;
  return (
    <header className="shadow-header">
      <Container>
        <div className="flex items-center py-6">
          <Logo logoTextStyles="mr-2 text-base font-bold text-main-color hover:text-third-color transition duration-500" />
          {isAuth ? (
            <>
              <UserNav />
              {width > 767 && <UserInfo />}
            </>
          ) : (
            <Link to="/auth" className="ml-auto flex items-center text-xs font-medium text-main-color">
              Авторизация
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
