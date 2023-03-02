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
  const { isAuth } = useAppSelector(store => store.auth);
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const { width } = useWindowDimensions();
  const onClose = () => {
    setIsBurgerMenu(false);
  };
  return (
    <header className="shadow-header">
      {width < 768 && (
        <Container>
          <div className="flex h-[64px] items-center justify-between py-[16px]">
            <Logo logoTextStyles="mr-2 text-base font-bold text-main-color hover:text-third-color transition duration-500" />
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
          </div>
        </Container>
      )}

      {width > 767 && width < 1280 && (
        <Container>
          <div className="flex h-[64px] items-center justify-between py-[16px]">
            <Logo logoTextStyles="mr-2 text-base font-bold text-main-color hover:text-third-color transition duration-500" />
            <div
              className="ml-[40px] flex w-full items-center"
              style={isAuth ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' }}
            >
              {isAuth && <Balance />}
              <div className="flex items-center">
                <button
                  className="py-[5px] text-second-color outline-none hover:text-accent-color focus:text-accent-color"
                  type="button"
                  onClick={() => {
                    setIsBurgerMenu(true);
                  }}
                >
                  <svg className="h-[14px] w-[22px] stroke-current transition duration-500 ">
                    <use href={sprite + '#menu'} width={22} height={14}></use>
                  </svg>
                </button>
                {isAuth && (
                  <div className="ml-[32px]">
                    <UserInfo />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      )}

      {width > 1279 && (
        <div className="flex h-[64px] items-center justify-between p-[16px]">
          <Logo logoTextStyles="mr-2 text-base font-bold text-main-color hover:text-third-color transition duration-500" />
          <div
            className="ml-[130px] flex w-full items-center"
            style={isAuth ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' }}
          >
            {isAuth && <Balance />}
            <div className="flex items-center">
              <UserNav onClose={onClose} />

              {isAuth && (
                <div className="ml-[40px]">
                  <UserInfo />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isBurgerMenu && <BurgerMenu onClose={onClose} />}
    </header>
  );
};

export default Header;
