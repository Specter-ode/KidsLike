const Balance: React.FC = () => {
  return (
    <div className="flex items-center">
      <p className="mr-2 flex flex-col text-xs font-medium text-fifth-color">
        <span>Баланс</span>
        <span>баллов:</span>
      </p>
      <p className="text-sm font-bold text-main-color">0</p>
    </div>
  );
};
export default Balance;
