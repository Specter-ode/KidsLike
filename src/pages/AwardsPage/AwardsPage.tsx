import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AwardTitle from '../../components/AwardTitle/AwardTitle';
import CardList from '../../components/CardsList/CardsList';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import WinningPrizes from '../../components/WinningPrizes/WinningPrizes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { buyGifts } from '../../redux/info/info-operations';
import { refreshPurchasedGifts } from '../../redux/info/info-slice';
import useWindowDimensions from '../../services/hooks/useDimensions';
import { IGift } from '../../types/info-types';

const AwardsPage: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const mobile = width < 768;
  const tablet = 767 < width && width < 1280;
  const laptop = width > 1279;
  const { currentChild, purchasedGifts } = useAppSelector(store => store.info);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setIsModal(false);
    document.body.classList.remove('fixed', 'overflow-hidden');
    dispatch(refreshPurchasedGifts());
    console.log('закрытие модалки');
  };
  const newPurchase = currentChild.gifts.filter(gift => gift.isPurchased && !purchasedGifts.includes(gift._id));
  console.log('newPurchase: ', newPurchase);
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let expense = 0;
    newPurchase.forEach(el => (expense += el.price));
    if (expense > currentChild.balance) {
      toast.error(`Сумма покупки превышает баланс.`);
      return;
    }
    const newPurchaseIds = newPurchase.map(el => el._id);
    dispatch(buyGifts({ childId: currentChild._id, giftIds: newPurchaseIds })).then(() => {
      setIsModal(true);
      document.body.classList.add('fixed', 'overflow-hidden');
    });
  };
  return (
    <section className="min-h-[calc(100vh-130px)] py-[20px] sTablet:min-h-[calc(100vh-148px)] sTablet:py-[40px] sLaptop:pt-[32px]">
      {mobile && (
        <>
          <Container>
            <div className="flex justify-between">
              <AwardTitle />
              {newPurchase.length > 0 && (
                <button className="btn w-[168px]" style={{ height: 32 }} type="submit" onClick={handleSubmit}>
                  Подтвердить выбор
                </button>
              )}
            </div>

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
          <div className="mt-[20px] flex justify-between">
            <AwardTitle />
            {newPurchase.length > 0 && (
              <button className="btn w-[168px]" style={{ height: 32 }} type="submit" onClick={handleSubmit}>
                Подтвердить выбор
              </button>
            )}
          </div>
          <CardList cards={currentChild.gifts} />
        </Container>
      )}
      {laptop && (
        <>
          <Container>
            <div className="relative flex items-center justify-between">
              <AwardTitle />
              {newPurchase.length > 0 && (
                <button
                  className="btn absolute-center w-[168px]"
                  type="submit"
                  style={{ height: 40 }}
                  onClick={handleSubmit}
                >
                  Подтвердить выбор
                </button>
              )}
              <ProgressBar />
            </div>
            <CardList cards={currentChild.gifts} />
          </Container>
        </>
      )}
      {isModal && (
        <Modal onClose={closeModal}>
          <WinningPrizes gifts={newPurchase} />
        </Modal>
      )}
    </section>
  );
};

export default AwardsPage;
