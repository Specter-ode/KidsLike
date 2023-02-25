import sprite from '../../assets/icons/sprite.svg';
const { REACT_APP_BACKEND_URL } = process.env;

const SocialAuth: React.FC = () => {
  return (
    <div className="mb-[20px]">
      <h3 className="mb-[20px] text-xs font-normal text-second-color">
        Вы можете авторизоваться с помощью Google или Facebook Account:
      </h3>
      <div className="flex justify-between">
        <a
          href={`${REACT_APP_BACKEND_URL}/auth/google`}
          className=" flex h-[42px] w-[45%] items-center justify-center rounded-[6px] border-gray-300 shadow-base hover:bg-accent-color"
        >
          <svg width="85" height="20">
            <use href={sprite + '#google'}></use>
          </svg>
        </a>
        <a
          href={`${REACT_APP_BACKEND_URL}/auth/google`}
          className=" flex h-[42px] w-[45%] items-center justify-center rounded-[6px] border-gray-300 shadow-base hover:bg-accent-color"
        >
          <svg width="85" height="20">
            <use href={sprite + '#facebook'}></use>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SocialAuth;
