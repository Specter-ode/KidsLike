import mainDesktop1x from '../../assets/img/main/no-tasks-desktop@1x.png';
import mainDesktop2x from '../../assets/img/main/no-tasks-desktop@2x.png';
import mainTablet1x from '../../assets/img/main/no-tasks-tablet@1x.png';
import mainTablet2x from '../../assets/img/main/no-tasks-tablet@2x.png';
import mainMobile1x from '../../assets/img/main/no-tasks-mobile@1x.png';
import mainMobile2x from '../../assets/img/main/no-tasks-mobile@2x.png';

import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../services/hooks/useDimensions';

interface IProps {
  isBefore: boolean;
}

const NoTasks: React.FC<IProps> = ({ isBefore }) => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();
  return (
    <div className=" mt-[60px]">
      {isBefore ? (
        <p className="mb-[20px] text-center text-[12px] font-bold text-main-color">
          На этот день не было назначено задач
        </p>
      ) : (
        <>
          <p className="mb-[20px] text-center text-[12px] font-bold text-main-color">На этот день нет задач</p>{' '}
          <button className="btn mx-auto w-[160px]" onClick={() => navigate('/planning')} type="button">
            Запланировать задачи
          </button>
        </>
      )}
      <img
        className="absolute left-0 bottom-[64px] z-[-1] w-full sTablet:hidden"
        src={mainMobile1x}
        srcSet={`${mainMobile1x} 1x, ${mainMobile2x} 2x`}
        alt="Kids meeting"
        width={320}
      />
      {width < 1280 && width > 767 && (
        <img
          className="absolute-x-center bottom-[56px] z-[-1] hidden w-full sTablet:block sTablet:max-h-[420px] sLaptop:hidden"
          style={{ display: height < 879 ? 'none' : 'block' }}
          src={mainTablet1x}
          srcSet={`${mainTablet1x} 1x, ${mainTablet2x} 2x`}
          alt="Kids meeting"
          width={768}
        />
      )}
      <img
        className="absolute bottom-0 left-[-107px] z-[-1] hidden w-[1051px] max-w-[1051px] sLaptop:block"
        src={mainDesktop1x}
        srcSet={`${mainDesktop1x} 1x, ${mainDesktop2x} 2x`}
        alt="Kids meeting"
        width={1051}
      />
    </div>
  );
};

export default NoTasks;
