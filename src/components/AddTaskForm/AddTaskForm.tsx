import addtask from '../../assets/img/addTask.jpg';
import sprite from '../../assets/icons/sprite.svg';
const AddTask: React.FC = () => {
  return (
    <div className="w-[280px] overflow-hidden">
      {/* <div className="h-[131px] w-full bg-main-bg"> */}

      {/* </div> */}

      <form className="relative bg-accent-color">
        <button type="button" className="absolute right-[16px] top-[95px]">
          <svg width="20" height="18">
            <use href={sprite + '#image'}></use>
          </svg>
        </button>
        <img className="h-[131px] w-full bg-main-bg" src={addtask} alt="Hi, please add task" />
        <div className=" px-[28px] pt-[24px] pb-[32px]">
          <div className=" relative mb-[5px] ">
            <div className="absolute top-[5px]">
              <svg width="24" height="24">
                <use href={sprite + '#pencil'}></use>
              </svg>
            </div>
            <input
              placeholder=" Добавить задание..."
              type="text"
              className="w-full border-b border-main-bg bg-transparent py-[7px] pl-[27px] pr-[6px] text-[14px] font-normal italic text-main-bg outline-none placeholder:italic placeholder:text-main-bg"
            />
          </div>
          <div className="relative">
            <div className="absolute top-[5px]">
              <svg width="24" height="24">
                <use href={sprite + '#pencil'}></use>
              </svg>
            </div>
            <input
              placeholder=" Добавить баллы..."
              type="number"
              className="w-full border-b border-main-bg  bg-transparent py-[7px] pl-[27px] pr-[6px] text-[14px] font-normal italic text-main-bg outline-none placeholder:italic placeholder:text-main-bg"
            />
          </div>
          <button className="mx-auto mt-[20px] block w-[60px] rounded-[6px]  bg-main-bg py-[6px] text-center text-[14px] font-bold text-main-color">
            ОК
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddTask;
