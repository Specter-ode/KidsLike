import { useState } from 'react';
import sprite from '../../assets/icons/sprite.svg';
import { useAppSelector } from '../../redux/hooks';
import useWindowDimensions from '../../services/hooks/useDimensions';
import Balance from '../Balance/Balance';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import UserInfo from '../UserInfo/UserInfo';
import UserNav from '../UserNav/UserNav';

const Header: React.FC = () => {
  const isAuth = useAppSelector(store => store.auth.isAuth);
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const { width } = useWindowDimensions();
  const onClose = () => {
    setIsBurgerMenu(false);
  };
  return (
    <header className="shadow-header">
      <Container>
        <div className="flex items-center justify-between py-[16px]">
          <Logo logoTextStyles="mr-2 text-base font-bold text-main-color hover:text-third-color transition duration-500" />
          {width < 768 && (
            <>
              {isAuth && <Balance />}
              <button
                className=" py-[5px] text-second-color outline-none hover:text-accent-color focus:text-accent-color"
                type="button"
                onClick={() => {
                  setIsBurgerMenu(true);
                }}
              >
                <svg className="h-[14px] w-[22px] justify-end stroke-current transition duration-500 ">
                  <use href={sprite + '#menu'} width={22} height={14}></use>
                </svg>
              </button>
            </>
          )}

          {width > 767 && (
            <div
              className="ml-[40px] flex w-full items-center  sLaptop:ml-[130px]"
              style={isAuth ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' }}
            >
              {isAuth && <Balance />}
              <div className="flex items-center">
                <button
                  className="py-[5px] text-second-color outline-none hover:text-accent-color focus:text-accent-color sLaptop:hidden"
                  type="button"
                  onClick={() => {
                    setIsBurgerMenu(true);
                  }}
                >
                  <svg className="h-[14px] w-[22px] stroke-current transition duration-500 ">
                    <use href={sprite + '#menu'} width={22} height={14}></use>
                  </svg>
                </button>
                <div className="hidden sLaptop:block">
                  <UserNav onClose={onClose} />
                </div>
                {isAuth && (
                  <div className="ml-[32px] sLaptop:ml-[40px]">
                    <UserInfo />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {isBurgerMenu && <BurgerMenu onClose={onClose} />}
      </Container>
    </header>
  );
};

export default Header;
