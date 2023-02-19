import { getScoreString } from '../../services/helpers/getScoreString';
import BtnAddPlanToCurrentTask from '../BtnAddPlanToCurrentTask/BtnAddPlanToCurrentTask';
import TaskToggle from '../TaskToggle/TaskToggle';
import sprite from '../../assets/icons/sprite.svg';
import { ITask } from '../../types/info-types';

const dayDetailsData = [
  { date: 'Пн', isActive: true, isCompleted: true },
  { date: 'Вт', isActive: false, isCompleted: true },
  { date: 'Ср', isActive: false, isCompleted: true },
  { date: 'Чт', isActive: true, isCompleted: false },
  { date: 'Пт', isActive: false, isCompleted: false },
  { date: 'Сб', isActive: false, isCompleted: false },
  { date: 'Вс', isActive: false, isCompleted: false },
];

const TaskCard: React.FC<ITask> = ({ id, title, reward, imageUrl, childId, days }) => {
  const stringReward = getScoreString(reward).toUpperCase();

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
              {reward} {stringReward}
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
          <TaskToggle days={dayDetailsData} taskId={id} />
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
