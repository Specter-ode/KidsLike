const NoTasks: React.FC = () => {
  return (
    <div className="mt-[60px] sTablet:mt-[100px]">
      <p className="mb-[20px] text-center text-[12px] font-bold text-main-color">На этот день нет задач</p>
      <button className="btn mx-auto w-[160px]">Запланировать задачи</button>
      <p className="sTablet-mt[110px] mt-[60px] h-[110px] w-[100%] bg-red-400 sTablet:h-[362px] sLaptop:mt-[40px] sLaptop:h-[372px]">
        IMAGE
      </p>
    </div>
  );
};

export default NoTasks;
