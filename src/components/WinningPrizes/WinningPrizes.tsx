import React from 'react';
// import modalcat from '../../assets/img/hero/img-1.png' ;

interface IAward {
  name: string;
  image: string;
}

interface IProps {
  awards: IAward[];
}

const WinningPrizes: React.FC<IProps> = ({ awards }) => {
  return (
    <>
      <div className="py-[60px] px-[20px] sTablet:py-[52px] sTablet:pt-[130px] sTablet:pb-[40px]">
        {
          <img
            className="lesTablet:w-[132px] absolute left-[50%] top-0 block -translate-x-[50%] sTablet:w-[200px]"
            // src={modalcat}
            alt="modalcat"
          />
        }
        <h2 className="mb-[24px] text-center text-[18px] font-semibold text-main-color sTablet:mb-[32px] lessTablet:max-w-[240px]">
          Поздравляем! Ты получаешь:
        </h2>

        <ul className="flex">
          {awards.map(award => (
            <li key={award.name} className="flex w-[90px] flex-col items-center">
              <img className="mb-[16x] block w-full" src={award.image} alt={award.name} />
              <p className="w-[100px] text-center text-[12px] font-bold text-main-color">{award.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WinningPrizes;
