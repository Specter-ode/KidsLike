import { ThreeDots } from 'react-loader-spinner';

const DotedLoader: React.FC = () => {
  return (
    <ThreeDots
      width="40"
      radius="10"
      color="#5679D7"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
      }}
      visible={true}
      height="20"
    />
  );
};

export default DotedLoader;
