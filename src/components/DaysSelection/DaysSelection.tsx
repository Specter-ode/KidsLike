import CheckBox from '../Checkbox/Checkbox';

interface IDayDetails {
  day: string;
  isChecked: boolean;
  isDisabled: boolean;
}
interface IProps {
  cardId: string;
  dayDetailsData: IDayDetails[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DaysSelection: React.FC<IProps> = ({ cardId, dayDetailsData, onChange }) => {
  return (
    <ul className="absolute top-0 right-0 flex translate-y-[-100%] flex-col rounded-[6px] bg-third-color py-[10px] px-[34px]">
      {dayDetailsData.map(({ day, isChecked, isDisabled }) => (
        <li key={cardId} className="mb-[10px] last:mb-0">
          <CheckBox
            id={day}
            name={day}
            value={day}
            label={day}
            checked={isChecked}
            disabled={isDisabled}
            onChange={onChange}
          />
        </li>
      ))}
    </ul>
  );
};
export default DaysSelection;
