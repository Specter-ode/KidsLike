import React from 'react';
import congratulations from '../../assets/img/congratulations.png';
import { useAppSelector } from '../../redux/hooks';
import { IGift } from '../../types/info-types';
import text from './text.json';

interface IProps {
  gifts: IGift[];
}

const WinningPrizes: React.FC<IProps> = ({ gifts }) => {
  const { lang } = useAppSelector(store => store.auth);
  return (
    <>
      <div className="relative px-[20px] pt-[80px] pb-[40px] sTablet:w-[600px] sTablet:py-[52px] sTablet:px-[60px] sTablet:pt-[130px] sTablet:pb-[40px] sLaptop:w-[800px] ">
        <img
          className="absolute left-[50%] top-0 block -translate-x-[50%] -translate-y-[50%] sTablet:w-[200px] lessTablet:w-[132px] lessTablet:-translate-y-[60%]"
          src={congratulations}
          alt="Congratulations"
        />
        <div>
          <h2 className="mb-[24px] text-center text-[18px] font-semibold text-main-color sTablet:mb-[32px] sTablet:text-[28px] sLaptop:text-[32px]">
            {text[lang].congratulations}
          </h2>
          <ul className="mx-auto flex max-h-[450px] w-full flex-wrap justify-center gap-[20px] overflow-y-auto sTablet:max-h-[286px] sLaptop:max-h-[306px]">
            {gifts.map(gift => (
              <li key={gift.title} className="flex w-[100px] flex-col items-center justify-center">
                <img
                  className="mb-[16px] block h-[90px] w-[90px] rounded-full border-[5px] border-accent-color  object-cover sLaptop:h-[100px] sLaptop:w-[100px] "
                  src={gift.imageUrl}
                  alt={gift.title}
                />
                <p className="max-w-[100px] text-center text-[12px] font-bold text-main-color ">{gift.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default WinningPrizes;
