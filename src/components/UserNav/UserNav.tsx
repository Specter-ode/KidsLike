import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { links } from './links';

// const getLinkClassName = ({ isActive: any }) => {
//   return isActive ? 'active' : 'link';
// };
// interface INavLink {
//   id: 'string';
//   to: 'string';
//   text: 'string';
// }

const UserNav: React.FC = () => {
  // const { isAuth } = useAppSelector(store => store.auth);
  const isAuth = false;
  const elements = links
    .filter(el => el.auth === isAuth)
    .map(({ id, to, text }) => {
      return (
        <li
          key={id}
          className=" border-main-bg pl-[20px] sLaptop:border-l-2 sLaptop:border-second-color sLaptop:px-[16px] sLaptop:first:border-none sLaptop:first:pl-0 sLaptop:last:pr-0 lessLaptop:border-t lessLaptop:py-[14px] lessLaptop:last:border-b"
        >
          <NavLink
            className="text-[12px] font-medium text-main-bg transition duration-300 hover:text-main-color sLaptop:text-second-color sLaptop:hover:text-accent-color"
            to={to}
          >
            <p className="py-[3px]"> {text}</p>
          </NavLink>
        </li>
      );
    });
  return <ul className="sLaptop:flex sLaptop:items-center  sLaptop:justify-between">{elements}</ul>;
};

export default UserNav;
