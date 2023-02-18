import { IGift, ITask } from '../../redux/info/info-types';
import TaskCard from '../TaskCard/TaskCard';
import GiftCard from '../GiftCard/GiftCard';

interface IProps {
  cards: ITask[] | IGift[];
}

const CardList: React.FC<IProps> = ({ cards }) => {
  console.log('cards: ', cards);
  const elements = cards?.map(card => {
    if ('reward' in card) {
      return <TaskCard key={card.id} {...card} />;
    }
    return <GiftCard key={card.id} {...card} />;
  });
  console.log('elements: ', elements);

  return (
    <ul className=" mx-auto mt-[32px] grid max-w-[480px] grid-cols-1 gap-y-[20px] sTablet:mt-[40px] sTablet:max-w-[768px] sTablet:grid-cols-tablet sTablet:gap-x-[32px] sLaptop:max-w-full sLaptop:grid-cols-laptop">
      {elements}
    </ul>
  );
};

export default CardList;
