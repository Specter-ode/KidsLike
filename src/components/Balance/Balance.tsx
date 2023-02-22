import { useAppSelector } from '../../redux/hooks';

const Balance: React.FC = () => {
  const balance = useAppSelector(store => store.info.currentChild.balance);

  return (
    <div className="flex items-center">
      <p className="mr-2 flex flex-col text-[12px] font-medium text-fifth-color">
        <span>Баланс</span>
        <span>баллов:</span>
      </p>
      <p className="ml-[8px] text-[14px] font-bold text-main-color">{balance}</p>
    </div>
  );
};
export default Balance;
