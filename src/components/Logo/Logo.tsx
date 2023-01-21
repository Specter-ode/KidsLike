import { Link } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../../assets/icons/logo.svg';

interface IProps {
  logoTextStyles: string;
  logoIconStyles?: string;
  scale: string;
}

const Logo: React.FC<IProps> = ({ scale, logoTextStyles, logoIconStyles }) => {
  const test = '';
  return (
    <Link to="/" className={`flex transition duration-500  hover:${scale}`}>
      <p className={logoTextStyles}>KidsLike</p>
      <LogoSVG className={logoIconStyles} />
    </Link>
  );
};

export default Logo;
