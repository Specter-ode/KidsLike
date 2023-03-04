import sprite from '../../assets/icons/sprite.svg';
import { useAppSelector } from '../../redux/hooks';
import text from './text.json';

const AwardTitle: React.FC = () => {
  const { lang } = useAppSelector(store => store.auth);
  return (
    <h2 className="flex items-center text-[16px] font-bold tracking-widest">
      <span className="mr-[16px]">
        <svg width="32" height="32">
          <use href={sprite + '#gift'}></use>
        </svg>
      </span>
      {text[lang].myAwards}
    </h2>
  );
};

export default AwardTitle;
