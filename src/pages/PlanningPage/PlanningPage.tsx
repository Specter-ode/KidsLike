import { useState } from 'react';
import CardList from '../../components/CardsList/CardsList';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';
import NewTaskForm from '../../components/NewTaskForm/NewTaskForm';
import PlanningPoints from '../../components/PlanningPoints/PlanningPoints';
import { useAppSelector } from '../../redux/hooks';

const PlanningPage: React.FC = () => {
  const storeCurrentChild = useAppSelector(store => store.info.currentChild);

  return (
    <section className="py-[20px] sTablet:py-[40px] sLaptop:pt-[32px]">
      <PlanningPoints />
      <Container>
        <CardList cards={storeCurrentChild.tasks} />
      </Container>
    </section>
  );
};

export default PlanningPage;
