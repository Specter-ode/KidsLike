const AddBtn: React.FC = () => {
  return (
    <button className=" flex h-[54px] w-[54px] items-center rounded-full transition duration-500 hover:scale-125">
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="27" cy="27" r="27" fill="#FFBC33" />
        <path d="M27 18.001V36.001" stroke="white" strokeWidth="4" stroke-linecap="round" />
        <path d="M18 27L36 27" stroke="white" strokeWidth="4" stroke-linecap="round" />
      </svg>
    </button>
  );
};

export default AddBtn;
