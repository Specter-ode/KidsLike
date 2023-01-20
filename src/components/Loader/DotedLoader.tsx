import { ThreeDots } from 'react-loader-spinner';

const DotedLoader = () => {
  return (
    <ThreeDots
      width="48"
      radius="9"
      color="#5679D7"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
      }}
      visible={true}
      height="24"
    />
  );
};

export default DotedLoader;
