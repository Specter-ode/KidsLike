import DaysSelection from '../DaysSelection/DaysSelection';
import sprite from '../../assets/icons/sprite.svg';

interface IDayDetails {
  date: string;
  isCompleted: boolean;
  isActive: boolean;
}
interface IProps {
  cardId: string;
  dayDetailsData: IDayDetails[];
}

const BtnAddPlanToCurrentTask: React.FC<IProps> = ({ cardId, dayDetailsData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
  };
  return (
    <div>
      <button className="flex h-[32px] w-[32px] items-center justify-center rounded-full">
        <svg width="32" height="32">
          <use href={sprite + '#plus'}></use>
        </svg>
      </button>
      <DaysSelection onChange={handleChange} cardId={cardId} dayDetailsData={dayDetailsData} />
    </div>
  );
};

export default BtnAddPlanToCurrentTask;
