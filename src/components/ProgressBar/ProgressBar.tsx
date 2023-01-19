import useWindowDimensions from '../../services/hooks/useDimensions';
import { Line } from 'rc-progress';

const ProgressBar: React.FC = () => {
  return (
    <div className="py-[12px]  sTablet:text-center sLaptop:m-0 sLaptop:text-end lessTablet:px-[20px] lessLaptop:mx-auto">
      <p className="text-[12px] font-medium text-fifth-color  sTablet:hidden ">Заработано баллов:</p>
      <p className="hidden text-[12px] font-medium text-fifth-color sTablet:mb-[10px] sTablet:block sLaptop:mb-[12px]">
        Заработано баллов за эту неделю:
        <span className="ml-[14px] text-[12px] font-bold text-main-color  ">8</span>
      </p>
      <p className="hidden text-[12px] font-medium text-fifth-color sTablet:mb-[10px] sTablet:block sLaptop:mb-[12px]">
        Запланировано баллов на эту неделю:<span className="ml-[14px] text-[12px] font-bold text-main-color">16</span>
      </p>
      <div className=" flex items-center sTablet:justify-center">
        <div className="mr-[20px]">
          <p className="text- mr-[8px] inline text-[14px] font-bold">8</p>
          <p className="inline text-[14px] font-normal">
            <span className="mr-[8px]">/</span>16
          </p>
        </div>
        <div className="h-[6px] w-[148px] items-center sTablet:w-[266px] sLaptop:w-[280px]">
          <Line percent={30} strokeWidth={3} strokeColor="#8EC63F" trailWidth={3} />
        </div>
      </div>
    </div>
  );
};
export default ProgressBar;
