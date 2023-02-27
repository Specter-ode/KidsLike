import { Line } from 'rc-progress';
import { useAppSelector } from '../../redux/hooks';
import OpenCardFormBtn from '../OpenCardFormBtn/OpenCardFormBtn';

const ProgressBar: React.FC = () => {
  const { rewardsGained, rewardsPlanned } = useAppSelector(store => store.info.currentChild);
  const percent = Math.round((rewardsGained / rewardsPlanned) * 100 || 0);
  return (
    <div className="sTablet:text-center  sLaptop:m-0 sLaptop:flex sLaptop:flex-col sLaptop:items-end sLaptop:text-end lessTablet:max-w-[480px] lessTablet:px-[20px] lessTablet:py-[12px] lessLaptop:mx-auto">
      <div className="flex w-[calc(100%-70px)] justify-between sTablet:hidden">
        <p className="text-[12px] font-medium text-fifth-color ">Заработано баллов:</p>
        <p className="text-[12px] font-bold ">{percent}%</p>
      </div>

      <div className="hidden sTablet:mb-[10px] sTablet:flex sTablet:justify-center ">
        <p className="text-[12px] font-medium text-fifth-color  ">Заработано баллов за эту неделю:</p>
        <p className="ml-[14px] w-[16px] text-[12px] font-bold text-main-color">{rewardsGained || 0}</p>
      </div>
      <div className="hidden sTablet:mb-[10px] sTablet:flex sTablet:justify-center">
        <p className="text-[12px] font-medium text-fifth-color ">Запланировано баллов на эту неделю:</p>
        <p className="ml-[14px] w-[16px] text-[12px] font-bold text-main-color">{rewardsPlanned || 0}</p>
      </div>
      <div className="flex items-center sTablet:justify-center">
        <div className="mr-[20px]">
          <p className="text- mr-[8px] inline text-[14px] font-bold">{rewardsGained || 0}</p>
          <p className="inline text-[14px] font-normal">
            <span className="mr-[8px]">/</span>
            {rewardsPlanned || 0}
          </p>
        </div>
        <div className="relative h-[6px] w-[calc(100%-8rem)] items-center sTablet:w-[232px] sLaptop:w-[280px]">
          <Line percent={percent} strokeWidth={3} strokeColor="#8EC63F" trailWidth={3} />
          <div className="absolute right-[-68px] bottom-[-16px] sTablet:hidden">
            <OpenCardFormBtn />
          </div>
        </div>
        <p className="ml-[8px] w-[31.5px] text-[12px] font-bold lessTablet:hidden ">{percent}%</p>
      </div>
    </div>
  );
};
export default ProgressBar;
