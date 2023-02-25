import DotedLoader from '../Loader/DotedLoader';
import sprite from '../../assets/icons/sprite.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeTaskCompletedStatus } from '../../redux/info/info-operations';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { togglePurchase } from '../../redux/info/info-slice';

interface IProps {
  _id: string;
  isChecked: boolean;
}

const TaskToggle: React.FC<IProps> = ({ _id, isChecked }) => {
  const { selectedDay, purchasedGifts } = useAppSelector(store => store.info);
  console.log('purchasedGifts: ', purchasedGifts);

  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const awardsPagePath = pathname === '/awards' || pathname === '/awards/*';
  const dispatch = useAppDispatch();
  const handleChange = () => {
    if (awardsPagePath) {
      dispatch(togglePurchase(_id));
    } else {
      setIsLoading(true);
      dispatch(changeTaskCompletedStatus({ date: selectedDay, taskId: _id })).finally(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <label htmlFor={`toggle-input${_id}+${selectedDay}`} className="relative inline-flex cursor-pointer items-center">
      <input
        id={`toggle-input${_id}+${selectedDay}`}
        name={_id}
        type="checkbox"
        checked={isChecked}
        className="peer sr-only"
        onChange={handleChange}
        disabled={purchasedGifts.includes(_id)}
      />
      <div className="peer h-[24px] w-[48px] rounded-full bg-error-color after:absolute after:top-[2px] after:left-[2px] after:h-[20px] after:w-[20px] after:rounded-full after:border after:border-red-700 after:bg-main-bg after:transition-all after:content-[''] peer-checked:bg-fourth-color peer-checked:after:translate-x-[24px] peer-checked:after:border-green-700 peer-disabled:bg-gray-400 peer-disabled:after:border-gray-700">
        <p className="absolute right-[10px] top-0 text-[16px] font-bold text-main-bg">!</p>
        <svg className="absolute top-[7px] left-[7px]" width={12} height={10}>
          <use href={sprite + '#yes-checked'}></use>
        </svg>
      </div>
      {isLoading && (
        <div className="absolute top-[24px] left-0 z-10">
          <DotedLoader />
        </div>
      )}
    </label>
  );
};

export default TaskToggle;
