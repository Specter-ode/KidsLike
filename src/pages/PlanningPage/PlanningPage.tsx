import { useState } from 'react';
import CardList from '../../components/CardsList/CardsList';
import Container from '../../components/Container/Container';
import PlanningPoints from '../../components/PlanningPoints/PlanningPoints';
import { ICard } from '../../types/Cards';
import { data } from '../MainPage/MainPage';

const PlanningPage: React.FC = () => {
  const [cards, setCards] = useState<ICard[]>(data);

  return (
    <main className="py-[20px] sTablet:py-[40px] sLaptop:pt-[32px]">
      <PlanningPoints />
      <Container>
        <CardList cards={cards} />
      </Container>
    </main>
  );
};

export default PlanningPage;
