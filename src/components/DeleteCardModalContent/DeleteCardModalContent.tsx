import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import text from './text.json';

interface IProps {
  onClose: () => void;
  handleDelete: () => void;
}

const DeleteCardModalContent: React.FC<IProps> = ({ onClose, handleDelete }) => {
  const { lang } = useAppSelector(store => store.auth);
  const { pathname } = useLocation();
  const awardsPage = pathname === '/awards' || pathname === '/awards/*';
  return (
    <div className="px-[20px] pt-[40px] pb-[20px]">
      <p className="mb-[20px] text-center text-[16px] font-bold">
        {text[lang].areYouWantDelete} {awardsPage ? text[lang].thisAward : text[lang].thisTask}?
      </p>
      <div className="flex ">
        <button type="button" onClick={handleDelete} className="btn mr-[20px] w-full">
          {text[lang].yes}
        </button>
        <button type="button" onClick={onClose} className="btn  w-full">
          {text[lang].no}
        </button>
      </div>
    </div>
  );
};

export default DeleteCardModalContent;
