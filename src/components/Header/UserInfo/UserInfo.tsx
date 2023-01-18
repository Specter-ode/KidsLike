import { ReactComponent as Logout } from '../../../assets/icons/logout.svg';

const UserInfo = () => {
  return (
    <>
      <div className="ml-10 flex items-center">
        <div className="flex items-center border-r-2 border-second-color pr-4">
          <p className="mr-2 flex h-6 w-6 items-center justify-center rounded-full  bg-third-color text-base font-bold text-white">
            V
          </p>
          <p className=" text-xs font-bold text-second-color">Email</p>
        </div>
        <button className="  pl-4">
          <Logout />
        </button>
      </div>
    </>
  );
};

export default UserInfo;
