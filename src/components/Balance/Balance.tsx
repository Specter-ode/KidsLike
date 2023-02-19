import { useAppSelector } from '../../redux/hooks';

const Balance: React.FC = () => {
  const balance = useAppSelector(store => store.info.currentChild.balance);

  return (
    <div className="flex items-center">
      <p className="mr-2 flex flex-col text-xs font-medium text-fifth-color">
        <span>Баланс</span>
        <span>баллов:{balance}</span>
      </p>
      <p className="text-sm font-bold text-main-color">{balance}</p>
    </div>
  );
};
export default Balance;
