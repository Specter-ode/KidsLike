import { getScoreString } from '../../services/helpers/getScoreString';
import TaskToggle from '../TaskToggle/TaskToggle';
import { IGift } from '../../types/info-types';

const GiftCard: React.FC<IGift> = ({ _id, title, price, isPurchased, imageUrl }) => {
  const stringReward = getScoreString(price).toUpperCase();

  return (
    <li className="overflow-hidden rounded-[6px] shadow-base">
      <div className="flex h-[194px] w-full items-center justify-center">
        <img alt={title} src={imageUrl} width={280} />
      </div>

      <div className="relative flex items-center justify-between bg-accent-color px-[20px] py-[16px]">
        <div>
          <p className="mb-[4px] text-[12px] font-bold text-main-color">{title}</p>
          <p className="inline rounded-[3px] bg-third-color py-[3px] px-[10px] text-center text-[10px] font-medium text-main-bg">
            {price} {stringReward}
          </p>
        </div>
        <div>
          <TaskToggle isChecked={isPurchased} _id={_id} />
        </div>
      </div>
    </li>
  );
};

export default GiftCard;
