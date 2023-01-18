import Spinner from 'react-spinners/CircleLoader';

export default function Loader({ size = 150 }) {
  return (
    <div className="flex items-center justify-center">
      <Spinner color="#ff9406" loading size={size} aria-label="Loading Spinner" speedMultiplier={0.7} />
    </div>
  );
}
