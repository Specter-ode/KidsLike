import { IGift, ITask } from '../../types/info-types';
import TaskCard from '../TaskCard/TaskCard';
import GiftCard from '../GiftCard/GiftCard';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

interface IProps {
  cards: Array<ITask | IGift>;
}

const CardList: React.FC<IProps> = ({ cards }) => {
  const { selectedDay } = useAppSelector(store => store.info);

  console.log('cards: ', cards);
  const { pathname } = useLocation();
  console.log('pathname CardList: ', pathname);
  const planPage = pathname === '/planning' || pathname === '/planning/*';
  const elements = cards
    .filter(card => {
      if ('reward' in card) {
        if (planPage) {
          return true;
        } else {
          const dayIndex = card.days.findIndex(day => day.date === selectedDay);
          return dayIndex >= 0 && card.days[dayIndex].isActive;
        }
      } else {
        return true;
      }
    })
    .map(card => {
      if ('reward' in card) {
        return <TaskCard key={`${card._id}card`} {...card} />;
      } else {
        return <GiftCard key={`${card._id}gift`} {...card} />;
      }
    });

  return (
    <ul className="list mx-auto mt-[32px] grid max-w-[480px] grid-cols-1 gap-y-[20px] sTablet:mt-[40px] sTablet:max-w-[768px] sTablet:grid-cols-tablet sTablet:gap-x-[32px] sLaptop:max-w-full sLaptop:grid-cols-laptop">
      {elements}
    </ul>
  );
};

export default CardList;
