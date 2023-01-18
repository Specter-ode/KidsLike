// import { useLocation } from 'react-router-dom';

const Container = ({ children }) => {
  //   const { pathname } = useLocation();

  //   if (pathname === '/main') {
  //     classes = s.container;
  //   }

  return (
    <div className="my-0 mx-auto min-w-[320px] max-w-[480px] px-[16px] sTablet:max-w-[768px] sTablet:px-[32px] sLaptop:max-w-[1280px] sLaptop:px-[20px]">
      {children}
    </div>
  );
};

export default Container;
