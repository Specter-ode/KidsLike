import { useState } from 'react';
import { getScoreString } from '../../services/helpers/getScoreString';
import OpenTaskFormBtn from '../OpenTaskFormBtn/OpenTaskFormBtn';
import Container from '../Container/Container';

const PlanningPoints: React.FC = () => {
  const [points, setPoints] = useState<number>(24);

  const pointsString = getScoreString(points);
  return (
    <>
      <Container>
        <div className="mb-[32px] sTablet:mb-[40px] sLaptop:flex sLaptop:items-center sLaptop:justify-between">
          <div className="text-center sTablet:mb-[20px] sTablet:flex sTablet:justify-center sLaptop:mb-0 sLaptop:items-center">
            <p className="text-[18px] font-normal tracking-widest text-main-color sTablet:mr-[10px] lessTablet:mb-[8px]">
              План на неделю:
            </p>
            <p className="inline-block rounded-[6px] border border-accent-color px-[15px] py-[6px] text-[12px] font-bold tracking-widest text-main-color">
              07 - 13.01.2021
            </p>
          </div>
          <div className="hidden sTablet:mb-[20px] sTablet:flex sTablet:items-center sTablet:justify-center sLaptop:mb-0">
            <p className="text-[14px] font-medium text-second-color">Определены задачи на </p>
            <p className="mx-[5px] flex h-[36px] w-[36px] items-center justify-center rounded-full bg-fourth-color text-[16px] font-semibold text-main-bg">
              {points}
            </p>
            <p className="text-[14px] font-medium text-second-color">{pointsString}</p>
          </div>
          <div className="hidden sTablet:flex sTablet:items-center sTablet:justify-center">
            <p className="mr-[20px] text-[14px] font-medium text-second-color">
              Хочешь получить больше призов - добавь задачи :)
            </p>
            <OpenTaskFormBtn />
          </div>
        </div>
      </Container>
      <div className="fixed left-0 bottom-0 z-50 mx-auto w-full bg-second-bg-color py-[14px] sTablet:hidden">
        <div className="relative mx-auto flex max-w-[calc(100%-2rem)] justify-center">
          <div className="relative flex h-[36px] w-[36px] items-center justify-center rounded-full bg-fourth-color">
            <p className="absolute left-[-153px] text-[12px] font-medium text-second-color">Определены задачи на</p>
            <p className="inline text-[16px] font-semibold text-main-bg">{points}</p>
            <p className="absolute right-[-42px]  text-[12px] font-medium text-second-color">{pointsString}</p>
          </div>
          <div className="absolute right-[0] top-[-6px] sTablet:hidden">
            <OpenTaskFormBtn />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanningPoints;
