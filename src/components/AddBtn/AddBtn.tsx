import sprite from '../../assets/icons/sprite.svg';

const AddBtn: React.FC = () => {
  return (
    <button className=" flex h-[54px] w-[54px] items-center rounded-full transition duration-500 hover:scale-110">
      <svg width="54" height="54">
        <use href={sprite + '#add'}></use>
      </svg>
    </button>
  );
};

export default AddBtn;
