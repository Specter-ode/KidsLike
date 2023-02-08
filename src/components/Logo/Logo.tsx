import { Link } from 'react-router-dom';
import sprite from '../../assets/icons/sprite.svg';

interface IProps {
  logoTextStyles: string;
  logoIconStyles?: string;
}

const Logo: React.FC<IProps> = ({ logoTextStyles, logoIconStyles }) => {
  return (
    <Link to="/" className={`flex items-center transition duration-500 hover:scale-125`}>
      <p className={logoTextStyles}>KidsLike</p>
      <svg className={logoIconStyles} width={13} height={18}>
        <use href={sprite + '#logo'}></use>
      </svg>
    </Link>
  );
};

export default Logo;
