import { ICard } from '../../types/Cards';
import Card from '../Card/Card';

interface IProps {
  cards: ICard[];
}
const CardList: React.FC<IProps> = ({ cards }) => {
  const elements = cards.map(card => <Card key={card.id} {...card} />);
  return (
    <ul className="mx-auto mt-[32px] mb-[86px] grid max-w-[480px] grid-cols-1 gap-y-[20px] px-[20px] sTablet:my-[40px] sTablet:max-w-[768px] sTablet:grid-cols-2 sTablet:gap-x-[32px] sTablet:px-[0px] sLaptop:max-w-full sLaptop:grid-cols-3">
      {elements}
    </ul>
  );
};

export default CardList;
