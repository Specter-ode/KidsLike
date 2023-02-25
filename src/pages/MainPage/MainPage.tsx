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
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentChild } from '../../redux/info/info-slice';
import useWindowDimensions from '../../services/hooks/useDimensions';
import { convertDate, getCurrentWeek, getDayOfWeek } from '../../services/helpers/date';

const MainPage: React.FC = () => {
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const { width } = useWindowDimensions();
  const mobile = width < 768;
  const tablet = 767 < width && width < 1280;
  const laptop = width > 1279;
  const { children, currentChild, selectedDay } = useAppSelector(store => store.info);
  const { startWeekDate, endWeekDate, lang } = useAppSelector(store => store.auth);

  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('!currentChild: ', !currentChild);
    console.log(' !currentChild._id: ', !currentChild._id);
    console.log('children.length: ', children.length);

    if ((!currentChild || !currentChild._id) && children.length === 1) {
      console.log('сработал юз ЕФФЕКТ');
      dispatch(setCurrentChild(children[0]));
    }
  }, [children, currentChild, dispatch]);

  const toggleAddChildForm = () => {
    if (children.length < 1) {
      toast.error('Закрытие окна невозможно. Информация о детях отсутсвует');
      return;
    }
    setShowAddChildForm(!showAddChildForm);
  };
  const currentWeek = useMemo(
    () => getCurrentWeek(startWeekDate, endWeekDate, lang),
    [startWeekDate, endWeekDate, lang]
  );

  return (
    <section className="min-h-[calc(100vh-130px)] pb-[20px] sTablet:min-h-[calc(100vh-148px)] sLaptop:relative sLaptop:flex sLaptop:justify-center sLaptop:pr-[16px]">
      {mobile && (
        <>
          <div className="flex flex-col items-center justify-center py-[20px]">
            <KidsProfile toggleAddChildForm={toggleAddChildForm} />
            <WeekTabs />
          </div>
          <Container>
            <p className="mb-[20px] text-center ">Неделя: {currentWeek} </p>
            <div className="text-center ">
              <p className="text-[12px] font-medium text-second-color ">Мои задачи:</p>
              <p className="text-[12px]  font-bold tracking-widest text-main-color">
                {getDayOfWeek(selectedDay)}, {convertDate(selectedDay)}
              </p>
            </div>
            <div></div>
            {currentChild && currentChild.tasks && <CardList cards={currentChild.tasks} />}
          </Container>
          {currentChild && currentChild.tasks && currentChild.tasks.length === 0 && <NoTasks />}
          <div className="fixed left-0 bottom-0 mx-auto w-full bg-second-bg-color">
            <ProgressBar />
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
            <ProgressBar />
            <div className="mt-[20px] flex justify-center">
              <p className="mr-[20px] text-[12px] font-medium text-second-color ">Мои задачи:</p>
              <p className="text-[12px] font-bold tracking-widest text-main-color ">
                {getDayOfWeek(selectedDay)}, {convertDate(selectedDay)}
              </p>
            </div>
            {currentChild && currentChild.tasks && <CardList cards={currentChild.tasks} />}
          </Container>
          {currentChild && currentChild.tasks && currentChild.tasks.length === 0 && <NoTasks />}
        </>
      )}

      {laptop && (
        <div className="relative ml-[336px] max-w-[1280px]">
          <div className="weektabs-container absolute  top-0 flex h-[calc(100vh-68px)] items-start justify-center bg-accent-color pt-[195px]">
            <div className="fixed">
              <WeekTabs />
            </div>
          </div>
          <div className=" mx-left w-[928px] pt-[32px] pb-[40px]">
            <KidsProfile toggleAddChildForm={toggleAddChildForm} />
            <div className="flex">
              <div className="w-1/2">
                <p className="mb-[38px]">Неделя: {currentWeek}</p>
                <div className="flex">
                  <p className="mr-[20px] text-[12px] font-medium text-second-color ">Мои задачи:</p>
                  <p className="text-[12px] font-bold tracking-widest text-main-color">
                    {getDayOfWeek(selectedDay)}, {convertDate(selectedDay)}
                  </p>
                </div>
              </div>
              <div className="w-1/2 sLaptop:relative">
                <ProgressBar />
              </div>
            </div>
            {currentChild && currentChild.tasks && <CardList cards={currentChild.tasks} />}

            {currentChild && currentChild.tasks && currentChild.tasks.length === 0 && <NoTasks />}
          </div>
        </div>
      )}

      {children.length < 1 && (
        <Modal onClose={toggleAddChildForm}>
          <div className="p-[20px]">
            <h3 className="mb-[20px] text-[14px] font-bold text-main-color">Приветствуем Вас</h3>
            <p className="mb-[20px] text-[14px] font-medium text-main-color">
              Для работы с приложением нужно внести данные ребенка
            </p>
            <AddChildForm toggleAddChildForm={toggleAddChildForm} />
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
