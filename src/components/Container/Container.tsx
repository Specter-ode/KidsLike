interface IProps {
  children: React.ReactNode;
}
const Container: React.FC<IProps> = ({ children }) => {
  return (
    <div className="my-0 mx-auto min-w-[320px] px-[20px] sTablet:w-[768px] sTablet:px-[32px] sLaptop:w-[1280px] sLaptop:px-[16px] lessTablet:max-w-[480px]">
      {children}
    </div>
  );
};

export default Container;
