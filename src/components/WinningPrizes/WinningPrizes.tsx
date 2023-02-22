import React from 'react';
import { IAward } from '../../types/award-types';
import imageURL from '../../assets/img/hero/img-1.png';
import { IGift } from '../../types/info-types';

interface IProps {
  gifts: IGift[];
}

const WinningPrizes: React.FC<IProps> = ({ gifts }) => {
  return (
    <>
      <div className="py-[60px] px-[20px] sTablet:w-[600px] sTablet:py-[52px] sTablet:px-[60px] sTablet:pt-[130px] sTablet:pb-[40px] ">
        {
          <img
            className="lesTablet:w-[132px] absolute left-[50%] top-0 block -translate-x-[50%] sTablet:w-[200px]"
            src={imageURL}
            alt="Congratulations"
          />
        }
        <h2 className="mb-[24px] text-center text-[18px] font-semibold text-main-color sTablet:mb-[32px] sTablet:text-[28px] sLaptop:text-[32px] lessTablet:max-w-[240px]">
          Поздравляем! Ты получаешь:
        </h2>
        <ul className="mx-auto grid w-full grid-cols-award gap-[20px]">
          {gifts.map(gift => (
            <li key={gift.title} className="flex flex-col items-center">
              <img className="mb-[16px] block w-[90px] " src={gift.imageUrl} alt={gift.title} />
              <p className="max-w-[100px] text-center text-[12px] font-bold text-main-color ">{gift.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WinningPrizes;
