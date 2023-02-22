import { useState } from 'react';
import CardList from '../../components/CardsList/CardsList';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';
import NewTaskForm from '../../components/NewTaskForm/NewTaskForm';
import PlanningPoints from '../../components/PlanningPoints/PlanningPoints';
import { useAppSelector } from '../../redux/hooks';

const PlanningPage: React.FC = () => {
  const { currentChild } = useAppSelector(store => store.info);

  return (
    <section className="min-h-[calc(100vh-130px)] py-[20px] sTablet:min-h-[calc(100vh-148px)] sTablet:py-[40px] sLaptop:pt-[32px]">
      <PlanningPoints />
      <Container>
        <CardList cards={currentChild.tasks} />
      </Container>
    </section>
  );
};

export default PlanningPage;
