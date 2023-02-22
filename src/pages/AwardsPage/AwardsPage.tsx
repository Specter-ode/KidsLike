import { useState } from 'react';
import AwardTitle from '../../components/AwardTitle/AwardTitle';
import CardList from '../../components/CardsList/CardsList';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import WinningPrizes from '../../components/WinningPrizes/WinningPrizes';
import { useAppSelector } from '../../redux/hooks';
import useWindowDimensions from '../../services/hooks/useDimensions';

const AwardsPage: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const mobile = width < 768;
  const tablet = 767 < width && width < 1280;
  const laptop = width > 1279;
  const { currentChild } = useAppSelector(store => store.info);
  const handleModalClose = () => {
    setIsModal(false);
    console.log('закрытие модалки');
  };

  return (
    <section className="min-h-[calc(100vh-130px)] py-[20px] sTablet:min-h-[calc(100vh-148px)] sTablet:py-[40px] sLaptop:pt-[32px]">
      {mobile && (
        <>
          <Container>
            <AwardTitle />
            <CardList cards={currentChild.gifts} />
          </Container>
          <div className="fixed left-0 bottom-0 mx-auto w-full bg-second-bg-color">
            <ProgressBar />
          </div>
        </>
      )}
      {tablet && (
        <Container>
          <ProgressBar />
          <div className="mt-[20px] flex justify-center">
            <AwardTitle />
          </div>
          <CardList cards={currentChild.gifts} />
        </Container>
      )}
      {laptop && (
        <>
          <Container>
            <div className="flex justify-between">
              <AwardTitle />
              <ProgressBar />
            </div>
            <CardList cards={currentChild.gifts} />
          </Container>
        </>
      )}
      {isModal && (
        <Modal onClose={handleModalClose}>
          <WinningPrizes gifts={currentChild.gifts} />
        </Modal>
      )}
    </section>
  );
};

export default AwardsPage;
