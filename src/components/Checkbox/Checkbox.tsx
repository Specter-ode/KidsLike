interface IProps {
  label: string;
  checked: boolean;
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}
const CheckBox: React.FC<IProps> = ({ name, label, checked, id, onChange, disabled }) => {
  console.log('checked: ', checked);
  return (
    <li className="mb-[8px] h-[18px] last:mb-0">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox mr-[10px] h-[14px] w-[14px] cursor-pointer rounded-[3px] border  border-main-bg  bg-third-color checked:border-2 checked:border-main-bg checked:hover:border-2 checked:hover:border-main-bg  focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-second-color disabled:hover:bg-second-color"
        disabled={disabled}
      />
      <label htmlFor={id} className="checkboxlabel text-[14px] font-bold text-main-bg ">
        {label}
      </label>
    </li>
  );
};

export default CheckBox;
