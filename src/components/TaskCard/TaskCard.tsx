import { getScoreString } from '../../services/helpers/getScoreString';
import BtnAddPlanToCurrentTask from '../BtnAddPlanToCurrentTask/BtnAddPlanToCurrentTask';
import TaskToggle from '../TaskToggle/TaskToggle';
import sprite from '../../assets/icons/sprite.svg';
import { ITask } from '../../types/info-types';
import { useLocation } from 'react-router-dom';
import { getDayStatus } from '../../services/helpers/date';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import NewCardForm from '../NewCardForm/NewCardForm';
import DeleteCardModalContent from '../DeleteCardModalContent/DeleteCardModalContent';
import { removeTask } from '../../redux/info/info-operations';
import EditAndDeleteCardBtn from '../EditAndDeleteCardBtn/EditAndDeleteCardBtn';
import { toast } from 'react-toastify';
import text from './text.json';

const TaskCard: React.FC<ITask> = ({ _id, title, reward, imageUrl, days }) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { lang } = useAppSelector(store => store.auth);
  const { selectedDay, currentChild } = useAppSelector(store => store.info);
  const stringReward = getScoreString(reward).toUpperCase();
  const { pathname } = useLocation();
  const dayStatus = getDayStatus(selectedDay);
  const planningPagePath = pathname === '/planning' || pathname === '/planning/*';
  const mainPagePath = pathname === '/main' || pathname === '/main/*';
  const isCompleted = days.find(day => day.date === selectedDay)?.isCompleted || false;
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
    const currentTask = currentChild.tasks.find(task => task._id === _id);
    const isCurrentTaskWasPlanned = currentTask?.days.find(day => day.isActive);
    if (isCurrentTaskWasPlanned) {
      toast.error(text[lang].plannedCanNotDeleted);
      return;
    }
    dispatch(removeTask(_id));
  };
  return (
    <li className="card overflow-hidden rounded-[6px] shadow-base  transition duration-500 hover:shadow-hover sTablet:w-[336px] sLaptop:w-[288px] sLaptop:hover:scale-105  sLaptop:focus:scale-105 lessTablet:w-full">
      <div className="relative flex h-[224px] items-center justify-center sTablet:h-[194px]">
        <img alt={title} src={imageUrl} width={280} className="h-full w-full" />
        {planningPagePath && (
          <EditAndDeleteCardBtn onOpenEditModal={onOpenEditModal} onOpenDeleteModal={onOpenDeleteModal} />
        )}
      </div>
      <div className="relative flex items-center justify-between bg-accent-color px-[20px] py-[16px]">
        <div>
          <p className="mb-[4px] text-[12px] font-bold text-main-color">{title}</p>
          <p className="inline rounded-[3px] bg-third-color py-[3px] px-[10px] text-center text-[10px] font-medium text-main-bg">
            <>
              {reward} {stringReward}
            </>
          </p>
        </div>
        {mainPagePath && dayStatus === 'before' && (
          <>
            {isCompleted ? (
              <button
                type="button"
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-fourth-color"
              >
                <svg className="fill-current" width={30} height={30}>
                  <use href={sprite + '#yes'}></use>
                </svg>
              </button>
            ) : (
              <button
                type="button"
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-none"
              >
                <svg className="fill-current" width={30} height={30}>
                  <use href={sprite + '#attention'}></use>
                </svg>
              </button>
            )}
          </>
        )}
        {mainPagePath && dayStatus === 'today' && <TaskToggle _id={_id} isChecked={isCompleted} />}
        {planningPagePath && (
          <div className="flex items-center">
            <BtnAddPlanToCurrentTask cardId={_id} days={days} />
          </div>
        )}
      </div>
      {isEditModal && (
        <Modal onClose={onCloseEditModal}>
          <NewCardForm task={{ _id, title, reward }} onCloseModal={onCloseEditModal} />
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

export default TaskCard;
