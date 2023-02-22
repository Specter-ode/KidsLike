import { getScoreString } from '../../services/helpers/getScoreString';
import BtnAddPlanToCurrentTask from '../BtnAddPlanToCurrentTask/BtnAddPlanToCurrentTask';
import TaskToggle from '../TaskToggle/TaskToggle';
import sprite from '../../assets/icons/sprite.svg';
import { ITask } from '../../types/info-types';
import { useLocation } from 'react-router-dom';
import { getDayStatus } from '../../services/helpers/date';
import { useAppSelector } from '../../redux/hooks';

const TaskCard: React.FC<ITask> = ({ _id, title, reward, imageUrl, days }) => {
  const { selectedDay } = useAppSelector(store => store.info);
  const stringReward = getScoreString(reward).toUpperCase();
  const { pathname } = useLocation();
  const dayStatus = getDayStatus(selectedDay);
  console.log('pathname CardList: ', pathname);
  const planningPagePath = pathname === '/planning' || pathname === '/planning/*';
  const mainPagePath = pathname === '/main' || pathname === '/main/*';
  const isCompleted = days.find(day => day.date === selectedDay)?.isCompleted || false;
  return (
    <li className="overflow-hidden rounded-[6px] shadow-base">
      <div className="h-[194px] w-full bg-second-color">
        <img alt={title} src={imageUrl} width={280} className="block" />
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
          {planningPagePath && <BtnAddPlanToCurrentTask cardId={_id} dayDetailsData={days} />}
          {mainPagePath && dayStatus === 'today' && <TaskToggle _id={_id} isChecked={isCompleted} />}
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
