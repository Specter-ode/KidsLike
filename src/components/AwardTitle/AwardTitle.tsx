import sprite from '../../assets/icons/sprite.svg';

const AwardTitle: React.FC = () => {
  return (
    <h2 className="flex items-center text-[14px] font-bold tracking-widest">
      <span className="mr-[16px]">
        <svg width="26" height="26">
          <use href={sprite + '#gift'}></use>
        </svg>
      </span>
      МОИ ПРИЗЫ
    </h2>
  );
};

export default AwardTitle;
