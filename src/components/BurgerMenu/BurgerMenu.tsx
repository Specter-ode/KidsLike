import UserInfo from '../UserInfo/UserInfo';
import closeIcon from '../../assets/icons/sprite.svg';
import UserNav from '../UserNav/UserNav';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

interface IProps {
  onClose: () => void;
}
const BurgerMenu: React.FC<IProps> = ({ onClose }) => {
  return createPortal(
    <div className="fixed top-0 left-0 z-[100] flex h-[100vh] w-[100vw] justify-end  bg-black/30">
      <aside className="w-[274px] bg-accent-color pt-[14px] lessLaptop:h-full">
        <div className="mx-[20px] flex justify-between">
          <div className="sTablet:hidden">
            <UserInfo />
          </div>
          <button
            type="button"
            className="absolute right-[20px] top-[20px] z-50 flex items-center justify-center border-none bg-transparent"
            onClick={onClose}
          >
            <svg
              className="scale-125 stroke-main-bg transition duration-300 hover:stroke-accent-color focus:stroke-accent-color"
              width={14}
              height={14}
            >
              <use href={closeIcon + '#modal-close'}></use>
            </svg>
          </button>
        </div>
        <div className="mt-[40px] sTablet:mt-[80px]">
          <UserNav />
        </div>
      </aside>
    </div>,
    modalRoot
  );
};

export default BurgerMenu;
