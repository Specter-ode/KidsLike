import { setLanguage } from '../../redux/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const LanguageSelector: React.FC = () => {
  const { lang } = useAppSelector(store => store.auth);
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center">
      <button
        type="button"
        className={`mr-[10px] w-[36px] py-[5px] text-[12px] font-medium ${
          lang === 'uk-UA'
            ? 'rounded-full bg-main-bg text-accent-color lessLaptop:font-bold'
            : ' sLaptop:text-second-color lessLaptop:text-main-bg '
        }`}
        onClick={() => {
          dispatch(setLanguage('uk-UA'));
        }}
      >
        УКР
      </button>
      <span className="text-[12px] sLaptop:text-second-color lessLaptop:text-main-bg">/</span>
      <button
        type="button"
        className={`ml-[10px] w-[36px] py-[5px] text-[12px] font-medium ${
          lang === 'ru-RU'
            ? 'rounded-full bg-main-bg text-accent-color lessLaptop:font-bold'
            : ' sLaptop:text-second-color lessLaptop:text-main-bg'
        }`}
        onClick={() => {
          dispatch(setLanguage('ru-RU'));
        }}
      >
        РУ
      </button>
    </div>
  );
};

export default LanguageSelector;
