import sprite from '../../assets/icons/sprite.svg';

interface IProps {
  width?: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
}

const AddBtn: React.FC<IProps> = ({ type = 'submit', onClick }) => {
  return (
    <button
      type={type}
      className=" flex h-[54px] w-[54px] items-center rounded-full transition duration-500 hover:scale-110"
      onClick={onClick}
    >
      <svg width="54" height="54">
        <use href={sprite + '#add'}></use>
      </svg>
    </button>
  );
};

export default AddBtn;
