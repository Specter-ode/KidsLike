import { NavLink } from 'react-router-dom';
import { links } from './links';
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
    <li key={id} className="border-l-2 border-second-color px-[16px] first:border-none first:pl-0 last:pr-0">
      <NavLink className="text-[12px] font-medium text-second-color hover:text-accent-color" to={to}>
        <p className="py-[3px]"> {text}</p>
      </NavLink>
    </li>
  ));
  return (
    <div className="ml-10 flex w-full items-center justify-between">
      <div className="flex items-center">
        <p className="mr-2 flex flex-col text-xs font-medium text-fifth-color">
          <span>Баланс</span>
          <span>баллов:</span>
        </p>
        <p className="text-sm font-bold text-main-color">0</p>
      </div>
      {width < 1280 ? (
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-[32px] w-[32px]  stroke-second-color hover:stroke-accent-color focus:stroke-accent-color "
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      ) : (
        <ul className="flex items-center justify-between">{elements}</ul>
      )}
    </div>
  );
};

export default UserNav;
