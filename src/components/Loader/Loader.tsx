import Spinner from 'react-spinners/CircleLoader';

interface IProps {
  size?: number;
}

const Loader: React.FC<IProps> = ({ size = 200 }) => {
  return (
    <div className="mt-[150px] flex items-center justify-center">
      <Spinner color="#ff9406" loading size={size} aria-label="Loading Spinner" speedMultiplier={0.7} />
    </div>
  );
};

export default Loader;
