import { useState } from 'react';
import AwardTitle from '../../components/AwardTitle/AwardTitle';
import CardList from '../../components/CardsList/CardsList';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import WinningPrizes from '../../components/WinningPrizes/WinningPrizes';
import { useAppSelector } from '../../redux/hooks';
import useWindowDimensions from '../../services/hooks/useDimensions';

const dataGift = [
  { id: '91', name: 'macDonalds fgfdsgs fsd', image: 'test1' },
  { id: '92', name: 'Каток f sfasf gggggggggggg', image: 'test2' },
  { id: '93', name: 'TEST333 ggdgd', image: 'TEST333' },
  { id: '94', name: 'Test444 gdgdgdbgd geg e gege', image: 'Test444' },
  { id: '95', name: 'Test5ggggggggg gdgd gdgeeeee', image: 'Test5' },
  { id: '191', name: 'macDonalds fgfdsgs fsd', image: 'test1' },
  { id: '192', name: 'Каток f sfasf gggggggggggg', image: 'test2' },
  { id: '193', name: 'TEST333 ggdgd', image: 'TEST333' },
  { id: '194', name: 'Test444 gdgdgdbgd geg e gege', image: 'Test444' },
  { id: '195', name: 'Test5ggggggggg gdgd gdgeeeee', image: 'Test5' },
];

const AwardsPage: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const mobile = width < 768;
  const tablet = 767 < width && width < 1280;
  const laptop = width > 1279;
  const storeCurrentChild = useAppSelector(store => store.info.currentChild);
  const handleModalClose = () => {
    setIsModal(false);
    console.log('закрытие модалки');
  };

  return (
    <section className="py-[20px] sTablet:py-[40px] sLaptop:pt-[32px]">
      {mobile && (
        <>
          <Container>
            <AwardTitle />
            <CardList cards={storeCurrentChild.gifts} />
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
          <CardList cards={storeCurrentChild.gifts} />
        </Container>
      )}
      {laptop && (
        <>
          <Container>
            <div className="flex justify-between">
              <AwardTitle />
              <ProgressBar />
            </div>
            <CardList cards={storeCurrentChild.gifts} />
          </Container>
        </>
      )}
      {isModal && (
        <Modal onClose={handleModalClose}>
          <WinningPrizes gifts={storeCurrentChild.gifts} />
        </Modal>
      )}
    </section>
  );
};

export default AwardsPage;
