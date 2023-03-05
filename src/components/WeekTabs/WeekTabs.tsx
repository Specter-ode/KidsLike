import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSelectedDay } from '../../redux/info/info-slice';
import { getCurrentWeekDates } from '../../services/helpers/date';
import useWindowDimensions from '../../services/hooks/useDimensions';

const WeekTabs: React.FC = () => {
  const { width } = useWindowDimensions();
  const { lang } = useAppSelector(store => store.auth);
  const { selectedDay } = useAppSelector(store => store.info);
  const dispatch = useAppDispatch();
  const setDay = (date: string): void => {
    dispatch(setSelectedDay(date));
  };
  const laptop = width > 1279;
  const days = useMemo(() => {
    return laptop ? getCurrentWeekDates(lang, 'long') : getCurrentWeekDates(lang, 'short');
  }, [lang, laptop]);

  return (
    <ul className="flex w-[280px] justify-between sMob:w-[376px] sLaptop:w-[181px] sLaptop:flex-col sLaptop:space-y-[8px]">
      {days.map(el => (
        <li
          key={el.date}
          className={`${
            selectedDay === el.date ? 'sTablet:bg-main-bg' : 'sTablet:bg-day'
          } flex h-[24px] w-[35px] items-center justify-center sMob:w-[40px]  sLaptop:h-[42px] sLaptop:w-full sLaptop:justify-start sLaptop:rounded-l-[6px] lessTablet:bg-accent-color lessLaptop:rounded-[6px] `}
        >
          <button
            className={`${
              selectedDay !== el.date && 'lessTablet:bg-day'
            } h-full w-full text-[12px] font-bold text-main-color sLaptop:pl-[20px] sLaptop:text-start sLaptop:text-[14px]`}
            onClick={() => {
              setDay(el.date);
            }}
          >
            {el.day}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default WeekTabs;
