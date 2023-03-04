import { useAppSelector } from '../../redux/hooks';
import DotedLoader from '../Loader/DotedLoader';
import text from './text.json';

const Balance: React.FC = () => {
  const { lang } = useAppSelector(store => store.auth);
  const { currentChild, isLoading } = useAppSelector(store => store.info);
  return (
    <div className="flex items-center">
      <p className="mr-2 flex flex-col text-[12px] font-medium text-fifth-color">
        <span>{text[lang].balance}</span>
        <span>{text[lang].points}</span>
      </p>
      <div className="ml-[8px]">
        {isLoading ? (
          <DotedLoader />
        ) : (
          <p className="text-[14px] font-bold text-main-color">{currentChild?.balance || 0}</p>
        )}
      </div>
    </div>
  );
};
export default Balance;
