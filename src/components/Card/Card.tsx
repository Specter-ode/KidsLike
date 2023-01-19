import { ICard } from '../../types/Cards';
const Card: React.FC<ICard> = ({ id, imageURL, title, isCompleted, isSelected, reward }) => {
  console.log('imageURL: ', imageURL);
  const rewardArr = Array.from('' + reward).map(Number);
  const lastNum = rewardArr[rewardArr.length - 1];
  const stringReward =
    reward === 11 || reward === 12
      ? 'Баллов'
      : lastNum === 1
      ? 'Балл'
      : lastNum > 1 && lastNum < 5
      ? 'Балла'
      : 'Баллов';

  // const result = test.[test.length-1]
  return (
    <li className="w-full shadow-base sTablet:w-[336px] sLaptop:w-[288px] ">
      <div className="h-[194px] w-full bg-second-color">Image</div>
      {/* <img alt={title} src={imageURL} width={280} className="block" /> */}
      <div className="flex bg-accent-color px-[20px] py-[16px] sLaptop:justify-between">
        <div>
          <p className="mb-[4px] text-[12px] font-bold text-main-color">{title}</p>
          <p className="w-[60px] bg-third-color text-center text-[10px] font-medium text-white">
            <>
              {reward} {stringReward}
            </>
          </p>
        </div>
        <div className="w-[40px]">
          <button> {isCompleted ? 'true' : 'false'}</button>
        </div>
      </div>
    </li>
  );
};

export default Card;
