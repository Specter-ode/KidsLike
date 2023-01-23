import DaysSelection from '../DaysSelection/DaysSelection';

interface IDayDetails {
  day: string;
  isChecked: boolean;
  isDisabled: boolean;
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
      <button className="flex h-[30px] w-[30px] items-center justify-center rounded-full">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_10_1414)">
            <circle cx="17" cy="16" r="15" fill="white" />
            <path d="M17 11V21" stroke="#8EC63F" stroke-width="2" strokeLinecap="round" />
            <path d="M12 16L22 16" stroke="#8EC63F" stroke-width="2" strokeLinecap="round" />
          </g>
          <defs>
            <filter
              id="filter0_d_10_1414"
              x="0"
              y="0"
              width="34"
              height="34"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_1414" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10_1414" result="shape" />
            </filter>
          </defs>
        </svg>
      </button>
      <DaysSelection onChange={handleChange} cardId={cardId} dayDetailsData={dayDetailsData} />
    </div>
  );
};

export default BtnAddPlanToCurrentTask;
