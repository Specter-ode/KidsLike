interface IProps {
  title: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
}

const Button: React.FC<IProps> = ({ title, type = 'submit', onClick }) => {
  return (
    <button className="btn" type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
