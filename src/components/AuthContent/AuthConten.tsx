interface IProps {
  children: React.ReactNode;
}
const AuthContent: React.FC<IProps> = ({ children }) => {
  return (
    <div className="relative sLaptop:flex sLaptop:justify-end sLaptop:pr-[120px]">
      <div className="absolute top-[20px] left-0 hidden w-[576px] sLaptop:block">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa facere earum beatae! Magni officia voluptas
        dolorem veniam quo perferendis reprehenderit inventore soluta hic, quia provident molestias earum, sit
        reiciendis? Suscipit molestias eaque, deleniti tempore ex nulla voluptatibus blanditiis quisquam, cumque
        consectetur tenetur eius dolores cupiditate magni ipsam vel, vero repellendus?
      </div>
      <div>
        <h2 className="mb-[32px] text-center text-[18px] font-semibold text-main-color sTablet:text-[28px] sLaptop:text-left sLaptop:text-[30px]">
          Выполняй задания,
          <br /> получи классные призы!
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthContent;
