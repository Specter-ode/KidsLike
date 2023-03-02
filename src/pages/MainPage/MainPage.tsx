import { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import AddChildForm from '../../components/AddChildForm/AddChildForm';
import CardList from '../../components/CardsList/CardsList';
import Container from '../../components/Container/Container';
import KidsProfile from '../../components/KidsProfile/KidsProfile';
import Modal from '../../components/Modal/Modal';
import NoTasks from '../../components/NoTasks/NoTasks';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import WeekTabs from '../../components/WeekTabs/WeekTabs';
import { useAppSelector } from '../../redux/hooks';
import useWindowDimensions from '../../services/hooks/useDimensions';
import { convertDate, getCurrentWeek, getDayOfWeek, hasActiveTaskOnDate } from '../../services/helpers/date';

const MainPage: React.FC = () => {
  const [activeTasks, setActiveTasks] = useState('');
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const { width } = useWindowDimensions();
  const mobile = width < 768;
  const tablet = 767 < width && width < 1280;
  const laptop = width > 1279;
  const { children, currentChild, selectedDay } = useAppSelector(store => store.info);
  const { startWeekDate, endWeekDate, lang } = useAppSelector(store => store.auth);

  const toggleAddChildForm = () => {
    setShowAddChildForm(!showAddChildForm);
  };
  const closeModalWithoutChildren = () => {
    toast.error('Закрытие окна невозможно. Нет информации о детях на Вашем аккаунте');
  };
  const currentWeek = useMemo(
    () => getCurrentWeek(startWeekDate, endWeekDate, lang),
    [startWeekDate, endWeekDate, lang]
  );
  useEffect(() => {
    if (currentChild?._id) {
      setActiveTasks(hasActiveTaskOnDate(currentChild, selectedDay));
    }
  }, [currentChild, selectedDay]);

  return (
    <section className="min-h-[calc(100vh-130px)] sTablet:min-h-[calc(100vh-120px)] sLaptop:relative lessTablet:pb-[20px]">
      {mobile && (
        <>
          <div className="flex flex-col items-center justify-center py-[20px]">
            <KidsProfile toggleAddChildForm={toggleAddChildForm} />
            <WeekTabs />
          </div>
          <Container>
            <p className="mb-[20px] text-center ">Неделя: {currentWeek} </p>
            <div className="text-center ">
              <p className="text-[14px] font-medium text-second-color ">Мои задачи:</p>
              <p className="text-[14px]  font-bold tracking-widest text-main-color">
                {getDayOfWeek(selectedDay)}, {convertDate(selectedDay)}
              </p>
            </div>
            <div></div>
            {activeTasks === 'active tasks' && <CardList cards={currentChild.tasks} />}
          </Container>
          {activeTasks === 'no active before' && <NoTasks isBefore={true} />}
          {activeTasks === 'no active' && <NoTasks isBefore={false} />}
          <div className="fixed left-0 bottom-0 mx-auto w-full bg-second-bg-color">
            {currentChild?._id && <ProgressBar />}
          </div>
        </>
      )}

      {tablet && (
        <>
          <div className="mb-[40px] flex items-center  justify-center bg-accent-color py-[22px]">
            <p className="mr-[28px] text-[14px] font-normal text-main-color">Неделя: {currentWeek}</p>
            <WeekTabs />
          </div>
          <Container>
            <KidsProfile toggleAddChildForm={toggleAddChildForm} />
            {currentChild?._id && <ProgressBar />}
            <div className="mt-[20px] flex justify-center">
              <p className="mr-[20px] text-[14px] font-medium text-second-color ">Мои задачи:</p>
              <p className="text-[14px] font-bold tracking-widest text-main-color ">
                {getDayOfWeek(selectedDay)}, {convertDate(selectedDay)}
              </p>
            </div>
            {activeTasks === 'active tasks' && <CardList cards={currentChild.tasks} />}
          </Container>
          {activeTasks === 'no active before' && <NoTasks isBefore={true} />}
          {activeTasks === 'no active' && <NoTasks isBefore={false} />}
        </>
      )}

      {laptop && (
        <div className="relative flex justify-end sTablet:min-h-[calc(100vh-120px)]">
          <div className="absolute top-0 left-0 h-[calc(100vh-64px)] items-start justify-center bg-accent-color pt-[195px] pl-[48px]">
            <WeekTabs />
          </div>
          <div className="ml-[341px] w-[calc(100%-325px)] pt-[32px] pb-[40px]">
            <div className="pr-[16px]">
              <KidsProfile toggleAddChildForm={toggleAddChildForm} />
              <div className="flex">
                <div className="w-1/2">
                  <p className="mb-[38px]">Неделя: {currentWeek}</p>
                  <div className="flex">
                    <p className="mr-[20px] text-[14px] font-medium text-second-color ">Мои задачи:</p>
                    <p className="text-[14px] font-bold tracking-widest text-main-color">
                      {getDayOfWeek(selectedDay)}, {convertDate(selectedDay)}
                    </p>
                  </div>
                </div>
                <div className="w-1/2 sLaptop:relative">{currentChild?._id && <ProgressBar />}</div>
              </div>
              {activeTasks === 'active tasks' && <CardList cards={currentChild.tasks} />}
            </div>
            {activeTasks === 'no active before' && <NoTasks isBefore={true} />}
            {activeTasks === 'no active' && <NoTasks isBefore={false} />}
          </div>
        </div>
      )}

      {children.length < 1 && (
        <Modal onClose={closeModalWithoutChildren}>
          <div className="p-[20px]">
            <h3 className="mb-[20px] text-[14px] font-bold text-main-color">Приветствуем Вас</h3>
            <p className="mb-[20px] text-[14px] font-medium text-main-color">
              Для работы с приложением нужно внести данные ребенка
            </p>
            <AddChildForm />
          </div>
        </Modal>
      )}
      {showAddChildForm && (
        <Modal onClose={toggleAddChildForm}>
          <div className="px-[20px] pt-[40px] pb-[20px] sMob:w-[376px] lessMob:w-[280px]">
            <h3 className="mb-[20px] text-center text-[14px] font-bold text-main-color">
              Добавить новый профиль ребенка
            </h3>
            <AddChildForm toggleAddChildForm={toggleAddChildForm} />
          </div>
        </Modal>
      )}
    </section>
  );
};

export default MainPage;
