import { useState } from 'react';
import { getScoreString } from '../../services/helpers/getScoreString';
import { ICard } from '../../types/Cards';
import BtnAddPlanToCurrentTask from '../BtnAddPlanToCurrentTask/BtnAddPlanToCurrentTask';
import TaskToggle from '../TaskToggle/TaskToggle';

const dayDetailsData = [
  { day: 'Пн', isChecked: true, isDisabled: true },
  { day: 'Вт', isChecked: false, isDisabled: true },
  { day: 'Ср', isChecked: false, isDisabled: true },
  { day: 'Чт', isChecked: true, isDisabled: false },
  { day: 'Пт', isChecked: false, isDisabled: false },
  { day: 'Сб', isChecked: false, isDisabled: false },
  { day: 'Вс', isChecked: false, isDisabled: false },
];

const Card: React.FC<ICard> = ({ id, imageURL, title, isCompleted, isSelected, reward }) => {
  const stringReward = getScoreString(reward).toUpperCase();
  // const [selectedDays, setSelectedDays] = useState<string[]>(daysList);

  return (
    <li className="rounded-[6px] shadow-base">
      <div className="h-[194px] w-full bg-second-color">Image</div>
      {/* <img alt={title} src={imageURL} width={280} className="block" /> */}
      <div className="relative flex items-center justify-between bg-accent-color px-[20px] py-[16px]">
        <div>
          <p className="mb-[4px] text-[12px] font-bold text-main-color">{title}</p>
          <p className="w-[60px] bg-third-color text-center text-[10px] font-medium text-main-bg">
            <>
              {reward} {stringReward}
            </>
          </p>
        </div>
        <div>
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-error-color">
            <p className="text-[16px] font-semibold text-main-bg">!</p>
          </div>
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-fourth-color">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 4.85185L4.42857 9L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <BtnAddPlanToCurrentTask cardId={id} dayDetailsData={dayDetailsData} />
          <TaskToggle />
        </div>
      </div>
    </li>
  );
};

export default Card;
