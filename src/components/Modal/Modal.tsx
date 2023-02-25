import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import closeIcon from '../../assets/icons/sprite.svg';
import { useAppSelector } from '../../redux/hooks';
import Loader from '../Loader/Loader';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

interface IProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ onClose, children }) => {
  const { isLoading } = useAppSelector(store => store.info);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const onBackdropClose = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed top-0 left-0 z-[100] h-[100vh] w-[100vw] bg-black/30" onClick={onBackdropClose}>
      <div className="absolute-center max-h-[70vh] rounded-[6px]  bg-main-bg lessTablet:max-h-[80vh]">
        <>
          <button
            type="button"
            className="absolute right-[20px] top-[20px] z-50 flex items-center justify-center border-none bg-transparent text-main-color transition duration-300 hover:scale-125 hover:text-accent-color focus:text-accent-color"
            onClick={onClose}
          >
            <svg className="h-[14px] w-[14px] fill-current ">
              <use href={closeIcon + '#modal-close'}></use>
            </svg>
          </button>
          {isLoading ? <Loader /> : children}
        </>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
