import { getScoreString } from '../../services/helpers/getScoreString';
import { ICard } from '../../types/Cards';
import TaskToggle from '../TaskToggle/TaskToggle';
const Card: React.FC<ICard> = ({ id, imageURL, title, isCompleted, isSelected, reward }) => {
  const stringReward = getScoreString(reward).toUpperCase();

  return (
    <li className="w-full overflow-hidden rounded-[6px] shadow-base sTablet:w-[336px] sLaptop:w-[288px]">
      <div className="h-[194px] w-full bg-second-color">Image</div>
      {/* <img alt={title} src={imageURL} width={280} className="block" /> */}
      <div className="flex items-center justify-between bg-accent-color px-[20px] py-[16px]">
        <div>
          <p className="mb-[4px] text-[12px] font-bold text-main-color">{title}</p>
          <p className="w-[60px] bg-third-color text-center text-[10px] font-medium text-white">
            <>
              {reward} {stringReward}
            </>
          </p>
        </div>
        <div>
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-error-color">
            <p className="text-[16px] font-semibold text-white">!</p>
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
          <TaskToggle />
        </div>
      </div>
    </li>
  );
};

export default Card;
