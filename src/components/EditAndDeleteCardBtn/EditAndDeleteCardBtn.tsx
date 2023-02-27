import sprite from '../../assets/icons/sprite.svg';

interface IProps {
  onOpenEditModal: () => void;
  onOpeneDeleteModal: () => void;
}

const EditAndDeleteCardBtn: React.FC<IProps> = ({ onOpenEditModal, onOpeneDeleteModal }) => {
  return (
    <>
      <button
        type="button"
        className="absolute left-[20px] bottom-[10px] flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1px] border-third-color bg-main-bg text-third-color"
        onClick={onOpenEditModal}
      >
        <svg className="fill-current" width={20} height={20}>
          <use href={sprite + '#edit'}></use>
        </svg>
      </button>
      <button
        type="button"
        className="absolute right-[21px] bottom-[10px] flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1px] border-error-color bg-main-bg text-error-color"
        onClick={onOpeneDeleteModal}
      >
        <svg className="fill-current" width={20} height={20}>
          <use href={sprite + '#delete'}></use>
        </svg>
      </button>
    </>
  );
};

export default EditAndDeleteCardBtn;
