import { NavLink } from 'react-router-dom';
import { links } from './links';
import { ReactComponent as Burger } from '../../../assets/icons/menu.svg';
import useWindowDimensions from '../../../services/hooks/useDimensions';
// const getLinkClassName = ({ isActive: any }) => {
//   return isActive ? 'active' : 'link';
// };
interface INavLink {
  id: 'string';
  to: 'string';
  text: 'string';
}

const UserNav: React.FC = () => {
  const { width } = useWindowDimensions();

  const elements = links.map(({ id, to, text }) => (
    <li key={id} className="border-l-2 border-second-color px-4 first:border-none first:pl-0 last:pr-0">
      <NavLink className="text-xs font-medium text-second-color" to={to}>
        {text}
      </NavLink>
    </li>
  ));
  return (
    <div className="ml-10 flex w-full items-center justify-between">
      <div className="flex items-center">
        <p className="mr-2 flex flex-col text-xs font-medium text-second-color">
          <span>Баланс</span>
          <span>баллов:</span>
        </p>
        <p className="text-sm font-bold text-main-color">0</p>
      </div>
      {width < 1280 ? (
        <button>
          <Burger />
        </button>
      ) : (
        <ul className="flex items-center justify-between">{elements}</ul>
      )}
    </div>
  );
};

export default UserNav;
