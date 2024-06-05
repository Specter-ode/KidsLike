import { useState } from 'react';
import { toast } from 'react-toastify';
import AwardTitle from '../../components/AwardTitle/AwardTitle';
import CardList from '../../components/CardsList/CardsList';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';
import OpenCardFormBtn from '../../components/OpenCardFormBtn/OpenCardFormBtn';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import WinningPrizes from '../../components/WinningPrizes/WinningPrizes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { buyGifts } from '../../redux/info/info-operations';
import { refreshPurchasedGifts } from '../../redux/info/info-slice';
import useWindowDimensions from '../../services/hooks/useDimensions';
import text from './text.json';

const AwardsPage: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const mobile = width < 768;
  const tablet = 767 < width && width < 1280;
  const laptop = width > 1279;
  const { currentChild, purchasedGifts } = useAppSelector(store => store.info);
  const { lang } = useAppSelector(store => store.auth);
  const dispatch = useAppDispatch();

  const closeModal = (): void => {
    setIsModal(false);
    document.body.classList.remove('overflow-hidden');
    dispatch(refreshPurchasedGifts());
  };
  const newPurchase = currentChild.gifts.filter(gift => gift.isPurchased && !purchasedGifts.includes(gift._id));
  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    let expense = 0;
    newPurchase.forEach(el => (expense += el.price));
    if (expense > currentChild.balance) {
      toast.error(text[lang].balanceError);
      return;
    }
    const newPurchaseIds = newPurchase.map(el => el._id);
    dispatch(buyGifts({ childId: currentChild._id, giftIds: newPurchaseIds })).then(() => {
      setIsModal(true);
      document.body.classList.add('overflow-hidden');
    });
  };
  return (
    <section className="min-h-[calc(100vh-130px)] py-[20px] sTablet:min-h-[calc(100vh-120px)] sTablet:py-[40px] sLaptop:pt-[32px]">
      {mobile && (
        <>
          <Container>
            {width > 410 ? (
              <div className="mx-auto flex  justify-between lessTablet:max-w-[376px]">
                <AwardTitle />
                {newPurchase.length > 0 && (
                  <button className="btn w-[168px]" style={{ height: 32 }} type="submit" onClick={handleSubmit}>
                    {text[lang].acceptChoice}
                  </button>
                )}
              </div>
            ) : (
              <div className="mx-auto flex  justify-center lessTablet:max-w-[376px]">
                {newPurchase.length > 0 ? (
                  <button className="btn w-[168px]" style={{ height: 32 }} type="submit" onClick={handleSubmit}>
                    {text[lang].acceptChoice}
                  </button>
                ) : (
                  <AwardTitle />
                )}
              </div>
            )}

            {currentChild?.gifts && <CardList cards={currentChild?.gifts} />}
          </Container>
          <div className="fixed left-0 bottom-0 mx-auto w-full bg-second-bg-color">
            {currentChild?._id && <ProgressBar />}
          </div>
        </>
      )}
      {tablet && (
        <Container>
          <div className="relative flex justify-between pb-[16px]">
            <AwardTitle />
            <div className="flex items-center justify-center">
              <p className="mr-[20px] text-[14px] font-medium text-second-color">{text[lang].wantNewAwardsAddThem}</p>
              <OpenCardFormBtn />
            </div>
            {newPurchase.length > 0 && (
              <button
                className="btn absolute-x-center top-[54px] w-[168px] "
                style={{ height: 40 }}
                type="submit"
                onClick={handleSubmit}
              >
                {text[lang].acceptChoice}
              </button>
            )}
          </div>
          {currentChild?.gifts && <CardList cards={currentChild?.gifts} />}
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
                  {text[lang].acceptChoice}
                </button>
              )}
              <div className="flex items-center justify-center">
                <p className="mr-[20px] text-[14px] font-medium text-second-color">{text[lang].wantNewAwardsAddThem}</p>
                <OpenCardFormBtn />
              </div>
            </div>
            {currentChild?.gifts && <CardList cards={currentChild?.gifts} />}
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
