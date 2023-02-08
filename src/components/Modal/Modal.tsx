import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import closeIcon from '../../assets/icons/sprite.svg';
import Loader from '../Loader/Loader';

const modalRoot = document.getElementById('#modal-root') as HTMLElement;

interface IProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ onClose, children }) => {
  const isLoading = false;
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

  //   const onBackdropClose = event => {
  //     if (event.target === event.currentTarget) {
  //       onClose();
  //     }
  //   };

  return createPortal(
    // <div onClick={onBackdropClose} className={s.overlay}>
    <div className="fixed top-0 left-0 z-[100] flex h-[100vh] w-[100vw] items-center justify-center  bg-black/30">
      <div className="absolute max-h-[80vh]  overflow-auto rounded-[6px] bg-main-bg">
        <>
          <button
            type="button"
            className="absolute right-[20px] top-[20px] z-50 flex scale-125 items-center justify-center border-none bg-transparent text-main-color transition duration-500 hover:text-accent-color focus:text-accent-color"
            onClick={onClose}
          >
            <svg
              className="duration-5000 scale-125 stroke-current transition hover:stroke-current focus:stroke-current"
              width={14}
              height={14}
            >
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
