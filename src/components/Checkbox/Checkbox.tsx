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
    <li className="mb-[8px] h-[18px] last:mb-0">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        value={value}
        onChange={onChange}
        className="mr-[10px] h-[14px] w-[14px] cursor-pointer rounded-[3px] border  border-main-bg  bg-third-color checked:border-2 checked:border-main-bg checked:hover:border-2 checked:hover:border-main-bg  focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-second-color disabled:hover:bg-second-color"
        disabled={disabled}
      />
      <label htmlFor={id} className="text-[14px] font-bold text-main-bg">
        {label}
      </label>
    </li>
  );
};

export default CheckBox;
