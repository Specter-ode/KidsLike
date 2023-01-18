import { Link } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../../assets/icons/logo.svg';

interface IProps {
  logoTextStyles: string;
  logoIconStyles?: string;
}

const Logo: React.FC<IProps> = ({ logoTextStyles, logoIconStyles }) => {
  return (
    <Link to="/" className="flex">
      <p className={logoTextStyles}>KidsLike</p>
      <LogoSVG className={logoIconStyles} />
    </Link>
  );
};

export default Logo;
