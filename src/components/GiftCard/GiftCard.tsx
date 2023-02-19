import { useState } from 'react';
import { getScoreString } from '../../services/helpers/getScoreString';
import BtnAddPlanToCurrentTask from '../BtnAddPlanToCurrentTask/BtnAddPlanToCurrentTask';
import TaskToggle from '../TaskToggle/TaskToggle';
import sprite from '../../assets/icons/sprite.svg';
import { IGift } from '../../types/info-types';

const dayDetailsData = [
  { date: 'Пн', isCompleted: true, isActive: true },
  { date: 'Вт', isCompleted: false, isActive: true },
  { date: 'Ср', isCompleted: false, isActive: true },
  { date: 'Чт', isCompleted: true, isActive: false },
  { date: 'Пт', isCompleted: false, isActive: false },
  { date: 'Сб', isCompleted: false, isActive: false },
  { date: 'Вс', isCompleted: false, isActive: false },
];

const GiftCard: React.FC<IGift> = ({ id, title, price, isPurchased, childId, imageUrl }) => {
  const stringReward = getScoreString(price).toUpperCase();

  // const [selectedDays, setSelectedDays] = useState<string[]>(daysList);

  return (
    <li className="overflow-hidden rounded-[6px] shadow-base">
      <div className="h-[194px] w-full bg-second-color">
        {/* <img alt={name} src={imageURL} width={280} className="block" /> */}
      </div>

      <div className="relative flex items-center justify-between bg-accent-color px-[20px] py-[16px]">
        <div>
          <p className="mb-[4px] text-[12px] font-bold text-main-color">{title}</p>
          <p className="inline rounded-[3px] bg-third-color py-[3px] px-[10px] text-center text-[10px] font-medium text-main-bg">
            <>
              {price} {stringReward}
            </>
          </p>
        </div>
        <div>
          <button type="button" className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-none">
            <svg className="fill-current" width={30} height={30}>
              <use href={sprite + '#attention'}></use>
            </svg>
          </button>
          <button
            type="button"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-fourth-color"
          >
            <svg className="fill-current" width={30} height={30}>
              <use href={sprite + '#yes'}></use>
            </svg>
          </button>
          <BtnAddPlanToCurrentTask cardId={id} dayDetailsData={dayDetailsData} />
          {/* <TaskToggle isCompleted={isPurchased} taskId={id} /> */}
        </div>
      </div>
    </li>
  );
};

export default GiftCard;