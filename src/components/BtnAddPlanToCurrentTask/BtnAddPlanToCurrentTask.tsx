import DaysSelection from '../DaysSelection/DaysSelection';
import sprite from '../../assets/icons/sprite.svg';
import { useState } from 'react';
import { IDay } from '../../types/info-types';
import { useAppDispatch } from '../../redux/hooks';
import { changeTaskActiveStatus } from '../../redux/info/info-operations';
import { toast } from 'react-toastify';
import DotedLoader from '../Loader/DotedLoader';

interface IProps {
  cardId: string;
  days: IDay[];
}

const BtnAddPlanToCurrentTask: React.FC<IProps> = ({ cardId, days }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSelection, setSelection] = useState(false);
  const [selectedDays, setSelectedDays] = useState(days);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setSelectedDays(prevState =>
      prevState.map(day => {
        if (day.date === name && day.isCompleted) {
          toast.error(`Это задание уже выполнено, его нельзя убрать из запланированных`);
          return day;
        }
        return day.date === name ? { ...day, isActive: !day.isActive } : day;
      })
    );
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelection(false);
    const isActiveEqual = selectedDays.every((day, i) => day.isActive === days[i].isActive);
    if (!isActiveEqual) {
      setIsLoading(true);
      dispatch(changeTaskActiveStatus({ days: selectedDays, taskId: cardId })).finally(() => {
        setIsLoading(false);
      });
    }
  };
  <svg width="32" height="32">
    <use href={sprite + '#ok'}></use>
  </svg>;
  return (
    <>
      {isSelection ? (
        <form onSubmit={handleSubmit}>
          <button type="submit" className="flex h-[32px] w-[32px] items-center justify-center rounded-full">
            <svg width="32" height="32">
              <use href={sprite + '#ok'}></use>
            </svg>
          </button>
          <DaysSelection handleChange={handleChange} cardId={cardId} selectedDays={selectedDays} />
        </form>
      ) : (
        <button
          className="flex h-[32px] w-[32px] items-center justify-center rounded-full"
          onClick={() => {
            setSelection(true);
          }}
        >
          <svg width="32" height="32">
            <use href={sprite + '#plus'}></use>
          </svg>
        </button>
      )}
      {isLoading && (
        <div className="absolute right-[16px] bottom-[3px] z-10">
          <DotedLoader />
        </div>
      )}
    </>
  );
};

export default BtnAddPlanToCurrentTask;
