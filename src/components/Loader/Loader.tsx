import Spinner from 'react-spinners/CircleLoader';

export default function Loader({ size = 200 }) {
  return (
    <div className="mt-[150px] flex items-center justify-center">
      <Spinner color="#ff9406" loading size={size} aria-label="Loading Spinner" speedMultiplier={0.7} />
    </div>
  );
}
