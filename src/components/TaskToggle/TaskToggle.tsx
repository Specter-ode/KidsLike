import DotedLoader from '../Loader/DotedLoader';
import sprite from '../../assets/icons/sprite.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { buyGift, changeTaskCompletedStatus } from '../../redux/info/info-operations';
import { useLocation } from 'react-router-dom';

interface IProps {
  _id: string;
  isChecked: boolean;
}

const TaskToggle: React.FC<IProps> = ({ _id, isChecked }) => {
  const { isLoading, selectedDay } = useAppSelector(store => store.info);
  const { pathname } = useLocation();
  const awardsPagePath = pathname === '/awards' || pathname === '/awards/*';

  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    console.log('TaskToggle checked: ', checked);
    if (awardsPagePath) {
      dispatch(buyGift(_id));
    } else {
      dispatch(changeTaskCompletedStatus({ date: selectedDay, taskId: _id }));
    }
  };

  return (
    <>
      <label htmlFor="toggle-input" className="relative inline-flex cursor-pointer items-center">
        <input id="toggle-input" type="checkbox" checked={isChecked} className="peer sr-only" onChange={handleChange} />
        <div className="peer h-[24px] w-[48px] rounded-full bg-error-color after:absolute after:top-[2px] after:left-[2px] after:h-[20px] after:w-[20px] after:rounded-full after:border after:border-red-700 after:bg-main-bg after:transition-all after:content-[''] peer-checked:bg-fourth-color peer-checked:after:translate-x-[24px] peer-checked:after:border-green-700">
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

      {/* <label htmlFor="id" className="relative inline-block h-[18px] w-[40px]">
        <input
          id="id"
          className="checked: h-0 w-0 opacity-0"
          type="checkbox"
          onChange={handleToggleChange}
          checked={isSelected || isCompleted}
        />



        <span className={classNames(s.slider, s.round)}>

        </span>
      </label> */}
    </>
  );
};

export default TaskToggle;
