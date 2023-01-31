import { useState } from 'react';
import AwardTitle from '../../components/AwardTitle/AwardTitle';
import CardList from '../../components/CardsList/CardsList';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import WinningPrizes from '../../components/WinningPrizes/WinningPrizes';
import useWindowDimensions from '../../services/hooks/useDimensions';
import { IAward } from '../../types/Award';
import { ICard } from '../../types/Cards';
import { data } from '../MainPage/MainPage';

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
  const [awards, setAwards] = useState<IAward[]>(dataGift);
  const [userAwards, setUserAwards] = useState<ICard[]>(data);
  const { width } = useWindowDimensions();
  const mobile = width < 768;
  const tablet = 767 < width && width < 1280;
  const laptop = width > 1279;

  const handleModalClose = () => {
    setIsModal(false);
    console.log('закрытие модалки');
  };

  return (
    <main className="py-[20px] sTablet:py-[40px] sLaptop:pt-[32px]">
      {mobile && (
        <>
          <Container>
            <AwardTitle />
            <CardList cards={userAwards} />
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
          <CardList cards={userAwards} />
        </Container>
      )}
      {laptop && (
        <>
          <Container>
            <div className="flex justify-between">
              <AwardTitle />
              <ProgressBar />
            </div>
            <CardList cards={userAwards} />
          </Container>
        </>
      )}
      {isModal && (
        <Modal onClose={handleModalClose}>
          <WinningPrizes awards={awards} />
        </Modal>
      )}
    </main>
  );
};

export default AwardsPage;
