import { useState } from 'react';
import CardList from '../../components/CardsList/CardsList';
import Container from '../../components/Container/Container';
import Footer from '../../components/Footer/Footer';
import PlanningPoints from '../../components/PlanningPoints/PlanningPoints';
import { ICard } from '../../types/Cards';
import { data } from '../MainPage/MainPage';

const PlanningPage: React.FC = () => {
  const [cards, setCards] = useState<ICard[]>(data);

  return (
    <main>
      <PlanningPoints />
      <Container>
        <CardList cards={cards} />
      </Container>
      <Footer />
    </main>
  );
};

export default PlanningPage;
