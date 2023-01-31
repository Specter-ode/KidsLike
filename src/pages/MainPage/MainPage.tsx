import { useState } from 'react';
import AddTask from '../../components/AddTask/AddTask';
import CardList from '../../components/CardsList/CardsList';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';
import NoTasks from '../../components/NoTasks/NoTasks';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import WeekTabs from '../../components/WeekTabs/WeekTabs';
import useWindowDimensions from '../../services/hooks/useDimensions';
import { ICard } from '../../types/Cards';

export const data = [
  {
    id: '31',
    imageURL: 'src/assets/img/bed-mobile.jpg',
    title: 'Застелить постель',
    isCompleted: true,
    isSelected: false,
    reward: 1,
  },
  {
    id: '32',
    imageURL: 'src/assets/img/cleaner-mobile.jpg',
    title: 'Застелить 222222222',
    isCompleted: true,
    isSelected: true,
    reward: 21,
  },
  {
    id: '33',
    imageURL: '../../assets/img/flowers-mobile.jpg',
    title: 'Застелить 3333333333',
    isCompleted: true,
    isSelected: false,
    reward: 11,
  },
  {
    id: '34',
    imageURL: '../../assets/img/teeth-mobile.jpg',
    title: 'Застелить 44444444',
    isCompleted: false,
    isSelected: false,
    reward: 27,
  },
  {
    id: '35',
    imageURL: '../../assets/img/sweep-mobile.jpg',
    title: 'Почистить зубы',
    isCompleted: true,
    isSelected: false,
    reward: 22,
  },
  {
    id: '36',
    imageURL: '../../assets/img/garbage-mobile.jpg',
    title: 'Выкинуть мусор',
    isCompleted: true,
    isSelected: false,
    reward: 100,
  },
  {
    id: '37',
    imageURL: '../../assets/img/bed-mobile.jpg',
    title: 'Полить цветы',
    isCompleted: true,
    isSelected: true,
    reward: 4,
  },
];

const MainPage: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ICard[]>(data);
  const { width } = useWindowDimensions();
  const mobile = width < 768;
  const tablet = 767 < width && width < 1280;
  const laptop = width > 1279;

  const handleModalClose = () => {
    setIsModal(false);
    console.log('закрытие модалки');
  };
  return (
    <main className="sLaptop:relative sLaptop:flex sLaptop:justify-center sLaptop:pr-[16px]">
      {isModal && (
        <Modal onClose={handleModalClose}>
          <AddTask />
        </Modal>
      )}

      {mobile && (
        <>
          <div className="flex items-center justify-center py-[20px]">
            <WeekTabs />
          </div>
          <Container>
            <p className="mb-[20px] text-center ">Неделя: 21-27 декабря</p>
            <div className="text-center ">
              <p className="text-[12px] font-medium text-second-color ">Мои задачи:</p>
              <p className="text-[12px]  font-bold tracking-widest text-main-color">ВТОРНИК, 22-12-2020</p>
            </div>
            <div></div>
            <CardList cards={tasks} />
          </Container>
          {/* <NoTasks /> */}
          <div className="fixed left-0 bottom-0 mx-auto w-full bg-second-bg-color">
            <ProgressBar />
          </div>
        </>
      )}

      {tablet && (
        <>
          <div className="flex items-center justify-center  bg-accent-color py-[22px]">
            <p className="mr-[28px] text-[14px] font-normal text-main-color">Неделя: 21-27 декабря</p>
            <WeekTabs />
          </div>
          <Container>
            <div className="mt-[40px]">
              <ProgressBar />
            </div>
            <div className="mt-[20px] flex justify-center">
              <p className="mr-[20px] text-[12px] font-medium text-second-color ">Мои задачи:</p>
              <p className="text-[12px] font-bold tracking-widest text-main-color ">ВТОРНИК, 22-12-2020</p>
            </div>
            <CardList cards={tasks} />
          </Container>
          {/* <NoTasks /> */}
        </>
      )}

      {laptop && (
        <div className="relative ml-[336px] max-w-[1280px]">
          <div className="absolute left-[-336px] top-0 flex h-[calc(100%+58px)] w-[229px] items-start justify-center bg-accent-color pl-[49px] pt-[150px]">
            <div className="fixed">
              <WeekTabs />
            </div>
          </div>
          <div className=" mx-left w-[928px] pt-[32px] pb-[40px]">
            <div className="flex">
              <div className="w-1/2">
                <p className="mb-[38px]">Неделя: 21-27 декабря</p>
                <div className="flex">
                  <p className="mr-[20px] text-[12px] font-medium text-second-color ">Мои задачи:</p>
                  <p className="text-[12px] font-bold tracking-widest text-main-color">ВТОРНИК, 22-12-2020</p>
                </div>
              </div>
              <div className="w-1/2 sLaptop:relative">
                <ProgressBar />
              </div>
            </div>
            <CardList cards={tasks} />
            {/* <NoTasks /> */}
          </div>
        </div>
      )}
    </main>
  );
};

export default MainPage;
