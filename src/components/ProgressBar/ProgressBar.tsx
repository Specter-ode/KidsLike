import { Line } from 'rc-progress';
import AddBtn from '../AddBtn/AddBtn';

const ProgressBar: React.FC = () => {
  return (
    <div className="sTablet:text-center  sLaptop:m-0 sLaptop:flex sLaptop:flex-col sLaptop:items-end sLaptop:text-end lessTablet:max-w-[480px] lessTablet:px-[20px] lessTablet:py-[12px] lessLaptop:mx-auto">
      <p className="text-[12px] font-medium text-fifth-color  sTablet:hidden ">Заработано баллов:</p>
      <div className="hidden sTablet:mb-[10px] sTablet:flex sTablet:justify-center ">
        <p className="text-[12px] font-medium text-fifth-color  ">Заработано баллов за эту неделю:</p>
        <p className="ml-[14px] w-[16px] text-[12px] font-bold text-main-color">8</p>
      </div>
      <div className="hidden sTablet:mb-[10px] sTablet:flex sTablet:justify-center">
        <p className="text-[12px] font-medium text-fifth-color ">Запланировано баллов на эту неделю:</p>
        <p className="ml-[14px] w-[16px] text-[12px] font-bold text-main-color">16</p>
      </div>
      <div className="flex items-center sTablet:justify-center">
        <div className="mr-[20px]">
          <p className="text- mr-[8px] inline text-[14px] font-bold">8</p>
          <p className="inline text-[14px] font-normal">
            <span className="mr-[8px]">/</span>16
          </p>
        </div>
        <div className="relative h-[6px] w-[calc(100%-8rem)] items-center sTablet:w-[266px] sLaptop:w-[280px]">
          <Line percent={30} strokeWidth={3} strokeColor="#8EC63F" trailWidth={3} />
          <div className="absolute right-[-68px] bottom-[-16px] sTablet:hidden">
            <AddBtn />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProgressBar;
