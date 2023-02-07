import addtask from '../../assets/img/addTask.jpg';

const AddTask: React.FC = () => {
  return (
    <div className="w-[280px] overflow-hidden">
      {/* <div className="h-[131px] w-full bg-main-bg"> */}

      {/* </div> */}

      <form className="relative bg-accent-color">
        <button type="button" className="absolute right-[16px] top-[95px]">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.1282 6.1875C9.00155 6.1875 8.08813 7.10087 8.08813 8.22762C8.08813 9.35432 9.0015 10.2677 10.1282 10.2677C11.2549 10.2677 12.1684 9.35436 12.1684 8.22762C12.1684 7.10087 11.255 6.1875 10.1282 6.1875ZM10.1282 9.29621C9.53805 9.29621 9.05961 8.81777 9.05961 8.22757C9.05961 7.63738 9.53805 7.15893 10.1282 7.15893C10.7184 7.15893 11.1969 7.63738 11.1969 8.22757C11.1969 8.81777 10.7184 9.29621 10.1282 9.29621Z"
              fill="black"
            />
            <path
              d="M18.2645 1.5239L5.0038 0.0181425C4.48914 -0.0550276 3.9677 0.0952176 3.57089 0.431038C3.17413 0.738687 2.9198 1.19472 2.86657 1.69394L2.62372 3.68548H1.87077C0.802135 3.68548 0.000656343 4.63265 0.000656343 5.70129V15.6346C-0.0262595 16.6537 0.778009 17.5016 1.79709 17.5285C1.82164 17.5292 1.84623 17.5293 1.87077 17.529H15.2043C16.2729 17.529 17.2444 16.7033 17.2444 15.6346V15.246C17.5757 15.182 17.89 15.0497 18.1673 14.8575C18.5608 14.5262 18.8128 14.057 18.8717 13.546L19.9889 3.68548C20.1028 2.61438 19.3341 1.65085 18.2645 1.5239ZM16.2729 15.6346C16.2729 16.1689 15.7386 16.5575 15.2043 16.5575H1.87077C1.3881 16.5717 0.98534 16.1919 0.971162 15.7092C0.970418 15.6844 0.970743 15.6595 0.972138 15.6346V13.8374L4.73664 11.0687C5.18886 10.7215 5.82583 10.7524 6.24244 11.1415L8.88973 13.4731C9.29174 13.8106 9.7978 13.9993 10.3227 14.0074C10.7331 14.0124 11.1367 13.9031 11.4885 13.6917L16.273 10.923V15.6346H16.2729ZM16.2729 9.78148L10.9784 12.8659C10.5237 13.1353 9.94828 13.0865 9.54542 12.7445L6.87387 10.3886C6.10819 9.73071 4.98906 9.69036 4.17801 10.2915L0.972138 12.623V5.70129C0.972138 5.16697 1.33645 4.65696 1.87077 4.65696H15.2043C15.7752 4.68063 16.2362 5.13118 16.2729 5.70129V9.78148ZM19.0183 3.55434C19.018 3.55755 19.0177 3.56081 19.0173 3.56401L17.8759 13.4245C17.8778 13.6802 17.7612 13.9223 17.5601 14.0803C17.463 14.1774 17.2444 14.226 17.2444 14.2746V5.70129C17.206 4.59486 16.3111 3.71054 15.2043 3.68548H3.59516L3.81374 1.7911C3.86115 1.54579 3.98941 1.32349 4.17805 1.15963C4.39106 1.01236 4.64859 0.943694 4.90669 0.96531L18.1431 2.49538C18.6772 2.54609 19.069 3.02021 19.0183 3.55434Z"
              fill="black"
            />
          </svg>
        </button>
        <img className="h-[131px] w-full bg-main-bg" src={addtask} alt="Hi, please add task" />
        <div className=" px-[28px] pt-[24px] pb-[32px]">
          <div className=" relative mb-[5px] ">
            <div className="absolute top-[5px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_4103_1183)">
                  <path
                    d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4103_1183">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_4103_1183)">
                  <path
                    d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4103_1183">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
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
