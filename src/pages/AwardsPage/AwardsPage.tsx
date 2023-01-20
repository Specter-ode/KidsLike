import Modal from '../../components/Modal/Modal';
import WinningPrizes from '../../components/WinningPrizes/WinningPrizes';

const AwardsPage: React.FC = () => {
  const awards = [
    { name: 'macDonalds', image: 'test1' },
    { name: 'Каток', image: 'test2' },
  ];
  const handleModalClose = () => {
    console.log('закрытие модалки');
  };
  return (
    <main>
      <h2>AwardsPage</h2>
      <Modal onClose={handleModalClose}>
        <WinningPrizes awards={awards} />
      </Modal>
    </main>
  );
};

export default AwardsPage;
