import { useAppSelector } from '../../redux/hooks';
import { compareDates, getDayOfWeek } from '../../services/helpers/date';
import { IDay } from '../../types/info-types';
import CheckBox from '../Checkbox/Checkbox';

interface IProps {
  cardId: string;
  selectedDays: IDay[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DaysSelection: React.FC<IProps> = ({ cardId, selectedDays, handleChange }) => {
  console.log('selectedDays: ', selectedDays);
  const { lang } = useAppSelector(store => store.auth);
  return (
    <ul className="absolute top-0 right-0 flex translate-y-[-100%] flex-col rounded-t-[6px] bg-third-color py-[10px] px-[34px]">
      {selectedDays?.map(({ date, isActive }) => (
        <CheckBox
          key={`${cardId}+${date}`}
          id={date}
          name={date}
          label={getDayOfWeek(date, lang, 'short')}
          checked={isActive}
          disabled={compareDates(date)}
          onChange={handleChange}
        />
      ))}
    </ul>
  );
};
export default DaysSelection;
