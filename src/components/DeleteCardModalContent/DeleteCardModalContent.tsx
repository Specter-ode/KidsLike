import { useLocation } from 'react-router-dom';

interface IProps {
  onClose: () => void;
  handleDelete: () => void;
}

const DeleteCardModalContent: React.FC<IProps> = ({ onClose, handleDelete }) => {
  const { pathname } = useLocation();
  const awardsPage = pathname === '/awards' || pathname === '/awards/*';
  return (
    <div className="px-[20px] pt-[40px] pb-[20px]">
      <p className="mb-[20px] text-center text-[16px] font-bold">
        Вы уверены, что хотите удалить {awardsPage ? 'этот подарок' : 'это задание'}?
      </p>
      <div className="flex ">
        <button type="button" onClick={handleDelete} className="btn mr-[20px] w-full">
          Да
        </button>
        <button type="button" onClick={onClose} className="btn  w-full">
          Нет
        </button>
      </div>
    </div>
  );
};

export default DeleteCardModalContent;
