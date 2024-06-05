import { Link, useLocation } from 'react-router-dom';
import sprite from '../../assets/icons/sprite.svg';
import { memo } from 'react';

interface IProps {
  logoTextStyles: string;
  logoIconStyles?: string;
}

const Logo: React.FC<IProps> = ({ logoTextStyles, logoIconStyles }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/main';

  return isHomePage ? (
    <div className={`flex items-center`}>
      <p className={logoTextStyles}>KidsLike</p>
      <svg className={logoIconStyles} width={13} height={18}>
        <use href={sprite + '#logo'}></use>
      </svg>
    </div>
  ) : (
    <Link to="/" className={`flex items-center transition duration-500 hover:scale-125`}>
      <p className={logoTextStyles}>KidsLike</p>
      <svg className={logoIconStyles} width={13} height={18}>
        <use href={sprite + '#logo'}></use>
      </svg>
    </Link>
  );
};

export default memo(Logo);
