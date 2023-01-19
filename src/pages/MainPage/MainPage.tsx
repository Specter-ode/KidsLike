import { useState } from 'react';
import CardList from '../../components/CardsList/CardsList';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import WeekTabs from '../../components/WeekTabs/WeekTabs';
import useWindowDimensions from '../../services/hooks/useDimensions';
import { ICard } from '../../types/Cards';

const data = [
  {
    id: '1',
    imageURL: 'src/assets/img/bed-mobile.jpg',
    title: 'Застелить постель',
    isCompleted: true,
    isSelected: false,
    reward: 1,
  },
  {
    id: '2',
    imageURL: 'src/assets/img/cleaner-mobile.jpg',
    title: 'Застелить 222222222',
    isCompleted: true,
    isSelected: true,
    reward: 21,
  },
  {
    id: '3',
    imageURL: '../../assets/img/flowers-mobile.jpg',
    title: 'Застелить 3333333333',
    isCompleted: true,
    isSelected: false,
    reward: 11,
  },
  {
    id: '4',
    imageURL: '../../assets/img/teeth-mobile.jpg',
    title: 'Застелить 44444444',
    isCompleted: false,
    isSelected: false,
    reward: 27,
  },
  {
    id: '5',
    imageURL: '../../assets/img/sweep-mobile.jpg',
    title: 'Почистить зубы',
    isCompleted: true,
    isSelected: false,
    reward: 22,
  },
  {
    id: '6',
    imageURL: '../../assets/img/garbage-mobile.jpg',
    title: 'Выкинуть мусор',
    isCompleted: true,
    isSelected: false,
    reward: 100,
  },
  {
    id: '7',
    imageURL: '../../assets/img/bed-mobile.jpg',
    title: 'Полить цветы',
    isCompleted: true,
    isSelected: true,
    reward: 4,
  },
];

const MainPage: React.FC = () => {
  const [cards, setCards] = useState<ICard[]>(data);
  const { width } = useWindowDimensions();
  const mobile = width < 768;
  const tablet = 767 < width && width < 1280;
  const laptop = width > 1279;
  return (
    <main className="sLaptop:relative">
      <div className="flex items-center justify-center py-[20px] sTablet:bg-accent-color sTablet:py-[22px]  sLaptop:w-[18%] sLaptop:items-start sLaptop:py-[140px] sLaptop:pl-[48px]">
        <p className="hidden text-[14px] font-normal text-main-color sTablet:mr-[28px] sTablet:block sLaptop:hidden">
          Неделя: 21-27 декабря
        </p>
        <WeekTabs />
      </div>
      {mobile && (
        <>
          <p className="text-center ">Неделя: 21-27 декабря</p>
          <div className="text-center ">
            <p className="text-[12px] font-medium text-second-color ">Мои задачи:</p>
            <p className="text-[12px]  font-bold text-main-color ">ВТОРНИК, 22-12-2020</p>
          </div>
          <CardList cards={cards} />
          <ProgressBar />
        </>
      )}
      {tablet && (
        <>
          <ProgressBar />
          <div className="text-center ">
            <p className="text-[12px] font-medium text-second-color ">Мои задачи:</p>
            <p className="text-[12px]  font-bold text-main-color ">ВТОРНИК, 22-12-2020</p>
          </div>
          <CardList cards={cards} />
        </>
      )}
      {laptop && (
        <div className="ml-auto w-[928px] pt-[32px] pb-[40px] pr-[16px]">
          <div className="flex">
            <div className="w-1/2">
              <p className="mb-[32px]">Неделя: 21-27 декабря</p>
              <div>
                <p className="mr-[20px] inline text-[12px] font-medium text-second-color ">Мои задачи:</p>
                <p className="inline text-[12px] font-bold text-main-color ">ВТОРНИК, 22-12-2020</p>
              </div>
            </div>
            <div className="w-1/2 sLaptop:relative lessTablet:fixed lessTablet:left-0 lessTablet:bottom-0 lessTablet:bg-second-bg-color">
              <ProgressBar />
            </div>
          </div>
          <CardList cards={cards} />
        </div>
      )}
    </main>
  );
};

export default MainPage;
