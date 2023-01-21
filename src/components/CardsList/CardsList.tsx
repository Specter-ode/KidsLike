import { IAward } from '../../types/Award';
import { ICard } from '../../types/Cards';
import Card from '../Card/Card';

interface IProps {
  cards: ICard[];
}
const CardList: React.FC<IProps> = ({ cards }) => {
  const elements = cards.map(card => <Card key={card.id} {...card} />);
  return (
    <>
      <ul className=" mx-auto mt-[32px] grid max-w-[480px] grid-cols-1 gap-y-[20px] sTablet:mt-[40px] sTablet:max-w-[768px] sTablet:grid-cols-tablet sTablet:gap-x-[32px] sLaptop:max-w-full sLaptop:grid-cols-laptop">
        {elements}
      </ul>
    </>
  );
};

export default CardList;
