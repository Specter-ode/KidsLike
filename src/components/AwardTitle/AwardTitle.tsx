import sprite from '../../assets/icons/sprite.svg';

const AwardTitle: React.FC = () => {
  return (
    <h2 className="flex items-center text-[16px] font-bold tracking-widest">
      <span className="mr-[16px]">
        <svg width="32" height="32">
          <use href={sprite + '#gift'}></use>
        </svg>
      </span>
      МОИ ПРИЗЫ
    </h2>
  );
};

export default AwardTitle;
