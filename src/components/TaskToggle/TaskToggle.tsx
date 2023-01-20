import { useState } from 'react';
import DotedLoader from '../Loader/DotedLoader';

const TaskToggle: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" value="" className="peer sr-only" checked={false} />
        <div className="peer h-[24px] w-[48px] rounded-full bg-error-color after:absolute after:top-[2px] after:left-[3px] after:h-[20px] after:w-[20px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-fourth-color peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-gray-300 ">
          <p className="absolute right-[12px] text-[16px] font-semibold text-white">!</p>
          <div className="absolute left-[8px] top-[8px]">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 4.85185L4.42857 9L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {isLoading && (
          <div className="absolute top-[24px] left-0 z-10">
            <DotedLoader />
          </div>
        )}
      </label>

      {/* <label htmlFor="_id" className="relative inline-block h-[18px] w-[40px]">
        <input
          id="_id"
          className="checked: h-0 w-0 opacity-0"
          type="checkbox"
          onChange={handleToggleChange}
          checked={isSelected || isCompleted}
        />



        <span className={classNames(s.slider, s.round)}>

        </span>
      </label> */}
    </>
  );
};

export default TaskToggle;
