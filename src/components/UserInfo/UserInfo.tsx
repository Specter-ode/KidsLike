import { handleLogout } from '../../redux/auth/auth-operations';
import { useAppDispatch } from '../../redux/hooks';
import sprite from '../../assets/icons/sprite.svg';

const UserInfo: React.FC = () => {
  const dispatch = useAppDispatch();

  const onLogout = () => {
    console.log('logout');
    dispatch(handleLogout());
  };

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center border-r-2 border-main-bg pr-[16px] sTablet:border-second-color">
          <p className="mr-[8px] flex h-[24px] w-[24px] items-center justify-center rounded-full  bg-third-color text-[16px] font-bold text-main-bg">
            V
          </p>
          <p className=" text-[12px] font-bold text-main-bg sTablet:text-second-color">Email</p>
        </div>
        <button
          className="pl-[16px] text-main-bg  transition duration-500 hover:scale-125 hover:text-main-color focus:scale-125 focus:text-main-color sTablet:text-second-color"
          type="button"
          onClick={() => onLogout()}
        >
          <svg width="18" height="18" className="fill-current hover:fill-current focus:fill-current">
            <use href={sprite + '#logout'}></use>
          </svg>
        </button>
      </div>
    </>
  );
};

export default UserInfo;
