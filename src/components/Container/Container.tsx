interface IProps {
  children: React.ReactNode;
}
const Container: React.FC<IProps> = ({ children }) => {
  return (
    <div className="my-0 mx-auto min-w-[320px] max-w-[480px] px-[20px] sTablet:max-w-[768px] sTablet:px-[32px] sLaptop:max-w-[1280px] sLaptop:px-[16px]">
      {children}
    </div>
  );
};

export default Container;
