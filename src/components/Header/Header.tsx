import { useState } from 'react';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../services/hooks/useDimensions';
import Balance from '../Balance/Balance';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import UserInfo from '../UserInfo/UserInfo';
import UserNav from '../UserNav/UserNav';

const Header: React.FC = () => {
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const { width } = useWindowDimensions();
  const isAuth = false;
  const onClose = () => {
    setIsBurgerMenu(false);
  };
  return (
    <header className="shadow-header">
      <Container>
        <div className="flex items-center py-[16px] lessTablet:justify-between">
          <Logo
            logoTextStyles="mr-2 text-base font-bold text-main-color hover:text-third-color transition duration-500"
            scale="scale-150"
          />
          {/* {isAuth ? (
            <> */}
          {width < 768 && (
            <>
              <Balance />
              <button
                type="button"
                onClick={() => {
                  setIsBurgerMenu(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-[32px] w-[32px]  stroke-second-color hover:stroke-accent-color focus:stroke-accent-color "
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </>
          )}

          {width > 767 && (
            <div className="ml-[40px] flex w-full items-center justify-between sLaptop:ml-[130px]">
              <Balance />
              <div className="flex items-center">
                <button
                  className="sLaptop:hidden"
                  type="button"
                  onClick={() => {
                    setIsBurgerMenu(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-[32px] w-[32px]  stroke-second-color hover:stroke-accent-color focus:stroke-accent-color "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
                <div className="hidden sLaptop:block">
                  <UserNav />
                </div>
                {isAuth && (
                  <div className="ml-[32px] sLaptop:ml-[40px]">
                    <UserInfo />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* <div className="flex items-center justify-between">
                <button className="sLaptop:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-[32px] w-[32px]  stroke-second-color hover:stroke-accent-color focus:stroke-accent-color "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
                <div className="hidden sLaptop:block">
                  <UserNav />
                </div>
              </div> */}
          {/* </>
          ) : (
            <Link to="/auth" className="ml-auto flex items-center text-xs font-medium text-main-color">
              Авторизация
            </Link>
          )} */}
        </div>
        {isBurgerMenu && <BurgerMenu onClose={onClose} />}
      </Container>
    </header>
  );
};

export default Header;
