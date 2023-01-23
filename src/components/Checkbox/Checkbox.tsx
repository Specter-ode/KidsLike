interface IProps {
  value: string;
  label: string;
  checked: boolean;
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}
const CheckBox: React.FC<IProps> = ({ value, label, checked, id, onChange, disabled }) => {
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-bold text-main-bg">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          value={value}
          onChange={onChange}
          
          className="bg-third-color w-[20px] cursor-pointer h-[20px] border border-main-bg  focus:ring-blue-200  rounded-[3px] mr-[10px] disabled:bg-second-color disabled:hover:bg-second-color disabled:cursor-not-allowed  checked:border-2 checked:border-main-bg checked:hover:border-2 checked:hover:border-main-bg"
          disabled={disabled}
        />
        <span></span>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
