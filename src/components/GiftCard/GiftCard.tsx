import { getScoreString } from '../../services/helpers/getScoreString';
import TaskToggle from '../TaskToggle/TaskToggle';
import { IGift } from '../../types/info-types';
import { useAppDispatch } from '../../redux/hooks';
import { useState } from 'react';
import { removeGift } from '../../redux/info/info-operations';
import Modal from '../Modal/Modal';
import NewCardForm from '../NewCardForm/NewCardForm';
import DeleteCardModalContent from '../DeleteCardModalContent/DeleteCardModalContent';
import EditAndDeleteCardBtn from '../EditAndDeleteCardBtn/EditAndDeleteCardBtn';

const GiftCard: React.FC<IGift> = ({ _id, title, price, isPurchased, imageUrl }) => {
  const stringReward = getScoreString(price).toUpperCase();
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const dispatch = useAppDispatch();

  const onOpenEditModal = () => {
    setIsEditModal(true);
  };
  const onCloseEditModal = () => {
    setIsEditModal(false);
  };
  const onOpenDeleteModal = () => {
    setIsDeleteModal(true);
  };
  const onCloseDeleteModal = () => {
    setIsDeleteModal(false);
  };

  const handleDelete = () => {
    dispatch(removeGift(_id));
  };
  return (
    <li className="card overflow-hidden rounded-[6px] shadow-base transition duration-500 hover:shadow-hover sTablet:w-[336px] sLaptop:w-[288px] sLaptop:hover:scale-105 sLaptop:focus:scale-105 lessTablet:w-full">
      <div className="relative flex h-[194px] items-center justify-center">
        <img alt={title} src={imageUrl} width={280} className=" h-full w-full" />
        <EditAndDeleteCardBtn onOpenEditModal={onOpenEditModal} onOpenDeleteModal={onOpenDeleteModal} />
      </div>
      <div className="relative flex items-center justify-between bg-accent-color px-[20px] py-[16px]">
        <div>
          <p className="mb-[4px] text-[12px] font-bold text-main-color">{title}</p>
          <p className="inline rounded-[3px] bg-third-color py-[3px] px-[10px] text-center text-[10px] font-medium text-main-bg">
            {price} {stringReward}
          </p>
        </div>
        <TaskToggle isChecked={isPurchased} _id={_id} />
      </div>
      {isEditModal && (
        <Modal onClose={onCloseEditModal}>
          <NewCardForm gift={{ _id, title, price }} onCloseModal={onCloseEditModal} />
        </Modal>
      )}
      {isDeleteModal && (
        <Modal onClose={onCloseDeleteModal}>
          <DeleteCardModalContent handleDelete={handleDelete} onClose={onCloseDeleteModal} />
        </Modal>
      )}
    </li>
  );
};

export default GiftCard;
