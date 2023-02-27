import sprite from '../../assets/icons/sprite.svg';
import { setFormModalStatus } from '../../redux/auth/auth-slice';
import { useAppDispatch } from '../../redux/hooks';

const OpenCardFormBtn: React.FC = () => {
  const dispatch = useAppDispatch();
  const onOpenModal = () => {
    dispatch(setFormModalStatus(true));
  };

  return (
    <button
      className=" flex h-[54px] w-[54px] items-center rounded-full transition duration-500 hover:scale-110"
      onClick={onOpenModal}
    >
      <svg width="54" height="54">
        <use href={sprite + '#add'}></use>
      </svg>
    </button>
  );
};

export default OpenCardFormBtn;
