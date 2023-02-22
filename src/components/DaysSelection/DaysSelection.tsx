import { useAppSelector } from '../../redux/hooks';
import { getDayOfWeek } from '../../services/helpers/date';
import CheckBox from '../Checkbox/Checkbox';

interface IDayDetails {
  date: string;
  isCompleted: boolean;
  isActive: boolean;
}
interface IProps {
  cardId: string;
  dayDetailsData: IDayDetails[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DaysSelection: React.FC<IProps> = ({ cardId, dayDetailsData, onChange }) => {
  const { lang } = useAppSelector(store => store.auth);
  return (
    <ul className="absolute top-0 right-0 flex translate-y-[-100%] flex-col rounded-t-[6px] bg-third-color py-[10px] px-[34px]">
      {dayDetailsData?.map(({ date, isCompleted, isActive }) => (
        <CheckBox
          key={cardId}
          id={date}
          name={date}
          value={date}
          label={getDayOfWeek(date, lang, 'short')}
          checked={isCompleted}
          disabled={isActive}
          onChange={onChange}
        />
      ))}
    </ul>
  );
};
export default DaysSelection;
