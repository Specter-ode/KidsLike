interface IProps {
  title: string;
  width?: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
}

const Button: React.FC<IProps> = ({ title, type = 'submit', width = '220px', onClick }) => {
  return (
    <button className="btn" style={{ width: `${width}` }} type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
